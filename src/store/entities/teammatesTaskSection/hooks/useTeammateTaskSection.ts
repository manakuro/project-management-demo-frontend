import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTeammateTaskSectionMutation } from 'src/graphql/hooks'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'
import {
  DEFAULT_TITLE_NAME,
  hasTeammateTaskSectionBeenPersisted,
} from '../util'
import { useTeammateTaskSectionCreatedSubscription } from './useTeammateTaskSectionCreatedSubscription'
import {
  TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useTeammateTaskSectionUpdatedSubscription,
} from './useTeammateTaskSectionUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useTeammateTaskSection = (teammateTaskSectionId: string) => {
  const { upsert } = useUpsert()
  const { me } = useMe()
  const { workspace } = useWorkspace()

  const teammateTaskSection = useRecoilValue(
    teammatesTaskSectionState(teammateTaskSectionId),
  )
  const [updateTeammateTaskSectionMutation] =
    useUpdateTeammateTaskSectionMutation()

  useTeammateTaskSectionUpdatedSubscription({
    teammateTaskSectionId,
  })
  useTeammateTaskSectionCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

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
      if (teammateTaskSection.name && val && teammateTaskSection.name === val)
        return
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
