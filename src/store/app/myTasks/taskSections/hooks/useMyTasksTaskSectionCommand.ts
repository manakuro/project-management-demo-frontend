import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTeammatesTaskSectionCommand } from 'src/store/entities/teammatesTaskSection'

export const useMyTasksTaskSectionCommand = () => {
  const { me } = useMe()
  const {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTask: deleteTaskSectionAndKeepTaskCommand,
  } = useTeammatesTaskSectionCommand()

  const addTaskSection = useRecoilCallback(
    () => () => {
      return addTeammatesTaskSection({ teammateId: me.id })
    },
    [me.id, addTeammatesTaskSection],
  )

  const deleteTaskSectionAndKeepTask = useRecoilCallback(
    () => async (id: string) => {
      await deleteTaskSectionAndKeepTaskCommand(id)
    },
    [deleteTaskSectionAndKeepTaskCommand],
  )

  const deleteTaskSectionAndDeleteTask = useRecoilCallback(
    () => async () => {},
    [],
  )

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTask,
    deleteTaskSectionAndDeleteTask,
  }
}
