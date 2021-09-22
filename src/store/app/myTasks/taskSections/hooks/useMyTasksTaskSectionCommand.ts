import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTeammatesTaskSectionsCommand } from 'src/store/entities/teammatesTaskSections'

export const useMyTasksTaskSectionCommand = () => {
  const { me } = useMe()
  const { addTeammatesTaskSection } = useTeammatesTaskSectionsCommand()

  const addMyTaskSection = useRecoilCallback(
    () => () => {
      return addTeammatesTaskSection({ teammateId: me.id })
    },
    [me.id, addTeammatesTaskSection],
  )

  return {
    addMyTaskSection,
  }
}
