import { useRecoilCallback } from 'recoil'
import { useCreateTeammateTaskSectionMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'
import { TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTeammateTaskSectionCreatedSubscription'
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse'
import { useUpsert } from './useUpsert'

export const useTeammatesTaskSectionCommand = () => {
  const { upsert } = useUpsert()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const [createTeammateTaskSectionMutation] =
    useCreateTeammateTaskSectionMutation()
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse()

  const addTeammatesTaskSection = useRecoilCallback(
    ({ reset }) =>
      async (val?: Partial<TeammateTaskSection>) => {
        const id = uuid()
        upsert({
          ...initialState(),
          ...val,
          isNew: true,
          id,
        })

        const res = await createTeammateTaskSectionMutation({
          variables: {
            input: {
              teammateId: me.id,
              workspaceId: workspace.id,
              requestId: TEAMMATE_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          reset(teammatesTaskSectionState(id))
          return ''
        }

        const addedTeammateTaskSection = res.data?.createTeammateTaskSection
        if (!addedTeammateTaskSection) return ''

        reset(teammatesTaskSectionState(id))
        setTeammatesTaskSections([
          {
            ...addedTeammateTaskSection,
            isNew: true,
          },
        ])

        return addedTeammateTaskSection.id
      },
    [
      createTeammateTaskSectionMutation,
      me.id,
      setTeammatesTaskSections,
      upsert,
      workspace.id,
    ],
  )

  return {
    addTeammatesTaskSection,
  }
}
