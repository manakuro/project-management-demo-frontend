import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTeammateTaskSectionDeletedAndKeepTasksSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import {
  teammateTaskByTeammateTaskSectionIdState,
  TeammateTaskResponse,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { TeammateTaskSectionDeletedAndKeepTasksSubscriptionResponse as Response } from '../type'
import { useResetTeammateTaskSectionSection } from './useResetTeammateTaskSection'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
  teammateId: string
}
export const TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid()
export const useTeammateTaskSectionDeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { resetTeammateTaskSection } = useResetTeammateTaskSectionSection()
  const { setTeammateTask } = useTeammateTaskResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      teammateId: props.teammateId,
      requestId:
        TEAMMATE_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return

      if (data.subscriptionData.data)
        setBySubscription(data.subscriptionData.data)
      previousData = data
    },
    skip: skipSubscription,
  })

  const setBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: Response) => {
        const data = response.teammateTaskSectionDeletedAndKeepTasks

        if (__DEV__) console.log('Teammate Task Section deleted!')

        const teammateTaskSectionId = data.teammateTaskSection.id
        const newTeammateTaskSectionId = data.keptTeammateTaskSection.id

        const teammateTasks = await snapshot.getPromise(
          teammateTaskByTeammateTaskSectionIdState(teammateTaskSectionId),
        )
        const newTeammateTasks = teammateTasks.map((t) => ({
          ...t,
          teammateTaskSectionId: newTeammateTaskSectionId,
        }))
        setTeammateTask(newTeammateTasks as TeammateTaskResponse[], {
          includeTask: false,
        })

        resetTeammateTaskSection(teammateTaskSectionId)
      },
    [resetTeammateTaskSection, setTeammateTask],
  )

  return {
    subscriptionResult,
  }
}
