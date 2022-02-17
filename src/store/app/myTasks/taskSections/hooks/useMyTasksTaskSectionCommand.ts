import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTeammatesTaskSectionCommand } from 'src/store/entities/teammatesTaskSection'

export const useMyTasksTaskSectionCommand = () => {
  const { me } = useMe()
  const { addTeammatesTaskSection } = useTeammatesTaskSectionCommand()

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
