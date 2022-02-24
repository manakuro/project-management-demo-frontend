import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTeammateTaskSectionMutation } from 'src/graphql/hooks'
import { omit } from 'src/shared/utils/omit'
import { useWorkspace } from 'src/store/entities/workspace'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection, UpdateTeammateTaskSectionInput } from '../type'
import {
  DEFAULT_TITLE_NAME,
  hasTeammateTaskSectionBeenPersisted,
} from '../util'
import { TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useTeammateTaskSection = (teammateTaskSectionId: string) => {
  const { upsert } = useUpsert()
  const { workspace } = useWorkspace()

  const teammateTaskSection = useRecoilValue(
    teammatesTaskSectionState(teammateTaskSectionId),
  )
  const [updateTeammateTaskSectionMutation] =
    useUpdateTeammateTaskSectionMutation()

  const setTeammateTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTaskSection>) => {
        const prev = await snapshot.getPromise(
          teammatesTaskSectionState(teammateTaskSectionId),
        )
        if (!hasTeammateTaskSectionBeenPersisted(prev)) return

        upsert({ ...prev, ...val })

        const res = await updateTeammateTaskSectionMutation({
          variables: {
            input: prepareUpdateTeammateTaskSectionInput(
              teammateTaskSectionId,
              workspace.id,
              val,
            ),
          },
        })
        if (res.errors) {
          upsert(prev)
        }
      },
    [
      teammateTaskSectionId,
      updateTeammateTaskSectionMutation,
      upsert,
      workspace.id,
    ],
  )

  const setTeammateTaskSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (teammateTaskSection.name && val && teammateTaskSection.name === val)
        return
      const name = val || DEFAULT_TITLE_NAME

      await setTeammateTaskSection({ name, isNew: false })
    },
    [setTeammateTaskSection, teammateTaskSection.name],
  )

  return {
    teammateTaskSection,
    setTeammateTaskSectionName,
  }
}

export const prepareUpdateTeammateTaskSectionInput = (
  teammateTaskSectionId: string,
  workspaceId: string,
  val: Partial<TeammateTaskSection>,
): UpdateTeammateTaskSectionInput => {
  return {
    ...omit(val, 'isNew'),
    id: teammateTaskSectionId,
    workspaceId,
    requestId: TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  }
}
