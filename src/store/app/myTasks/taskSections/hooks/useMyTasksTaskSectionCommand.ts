import { useRecoilCallback } from 'recoil'
import { useMe } from 'src/store/entities/me'
import { useTeammatesTaskSectionCommand } from 'src/store/entities/teammatesTaskSection'

export const useMyTasksTaskSectionCommand = () => {
  const { me } = useMe()
  const {
    addTeammatesTaskSection,
    deleteTaskSectionAndKeepTasks: deleteTaskSectionAndKeepTasksCommand,
    deleteTaskSectionAndDeleteTasks: deleteTaskSectionAndDeleteTasksCommand,
  } = useTeammatesTaskSectionCommand()

  const addTaskSection = useRecoilCallback(
    () => () => {
      return addTeammatesTaskSection({ teammateId: me.id })
    },
    [me.id, addTeammatesTaskSection],
  )

  const deleteTaskSectionAndKeepTasks = useRecoilCallback(
    () => async (id: string) => {
      await deleteTaskSectionAndKeepTasksCommand(id)
    },
    [deleteTaskSectionAndKeepTasksCommand],
  )

  const deleteTaskSectionAndDeleteTask = useRecoilCallback(
    () => async (id: string) => {
      await deleteTaskSectionAndDeleteTasksCommand(id)
    },
    [deleteTaskSectionAndDeleteTasksCommand],
  )

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTask,
  }
}
