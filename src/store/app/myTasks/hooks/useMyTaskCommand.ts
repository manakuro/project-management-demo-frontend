import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTaskSectionsCommand } from 'src/store/entities/taskSections'

export const useMyTaskCommand = () => {
  const { me } = useMe()
  const { addTaskSection } = useTaskSectionsCommand()

  const addMyTaskSection = useRecoilCallback(
    () => () => {
      return addTaskSection({ teammateId: me.id })
    },
    [me.id, addTaskSection],
  )

  return {
    addMyTaskSection,
  }
}
