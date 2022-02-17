import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTeammateTaskSectionMutation } from 'src/graphql/hooks'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'
import {
  TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useTeammateTaskCreatedSubscription,
} from './useTeammateTaskSectionUpdatedSubscription'
import { useUpsert } from './useUpsert'

const DEFAULT_TITLE_NAME = 'Untitled Section'
export const useTeammateTaskSection = (teammateTaskSectionId: string) => {
  const { upsert } = useUpsert()
  const teammateTaskSection = useRecoilValue(
    teammatesTaskSectionState(teammateTaskSectionId),
  )
  const [updateTeammateTaskSectionMutation] =
    useUpdateTeammateTaskSectionMutation()

  useTeammateTaskCreatedSubscription({
    teammateTaskSectionId,
  })

  const setTeammateTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTaskSection>) => {
        const prev = await snapshot.getPromise(
          teammatesTaskSectionState(teammateTaskSectionId),
        )
        upsert({ ...prev, ...val })

        const res = await updateTeammateTaskSectionMutation({
          variables: {
            input: {
              id: teammateTaskSectionId,
              requestId: TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
              ...val,
            },
          },
        })
        if (res.errors) {
          upsert(prev)
        }
      },
    [teammateTaskSectionId, updateTeammateTaskSectionMutation, upsert],
  )

  const setTeammateTaskSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (teammateTaskSection.name === val) return
      const name = val || DEFAULT_TITLE_NAME

      await setTeammateTaskSection({ name })
    },
    [setTeammateTaskSection, teammateTaskSection.name],
  )

  return {
    teammateTaskSection,
    setTeammateTaskSectionName,
  }
}
