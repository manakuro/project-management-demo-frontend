import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTeammateTaskSectionMutation } from 'src/graphql/hooks'
import { omit } from 'src/shared/utils/omit'
import { useWorkspace } from 'src/store/entities/workspace'
import { teammatesTaskSectionState } from '../atom'
import type {
  TeammateTaskSection,
  UpdateTeammateTaskSectionInput,
} from '../type'
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
      async (input: Partial<TeammateTaskSection>) => {
        const prev = await snapshot.getPromise(
          teammatesTaskSectionState(teammateTaskSectionId),
        )
        if (!hasTeammateTaskSectionBeenPersisted(prev)) return

        upsert({ ...prev, ...input })

        const res = await updateTeammateTaskSectionMutation({
          variables: {
            input: prepareUpdateTeammateTaskSectionInput(
              teammateTaskSectionId,
              workspace.id,
              input,
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
    () => async (input: string) => {
      if (
        teammateTaskSection.name &&
        input &&
        teammateTaskSection.name === input
      )
        return
      const name = input || DEFAULT_TITLE_NAME

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
  input: Partial<TeammateTaskSection>,
): UpdateTeammateTaskSectionInput => {
  return {
    ...omit(input, 'isNew'),
    id: teammateTaskSectionId,
    workspaceId,
    requestId: TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  }
}
