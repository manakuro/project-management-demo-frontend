import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionCommand as useCommand } from 'src/store/entities/projectTaskSection'
import { useProjectsProjectId } from '../../project'

export const useProjectsTaskSectionCommand = () => {
  const {
    addProjectsTaskSection,
    deleteTaskSectionAndKeepTasks: deleteTaskSectionAndKeepTasksCommand,
    deleteTaskSectionAndDeleteTasks: deleteTaskSectionAndDeleteTasksCommand,
    deleteProjectTaskSection: deleteProjectTaskSectionCommand,
  } = useCommand()
  const { projectId } = useProjectsProjectId()

  const addTaskSection = useRecoilCallback(
    () => () => {
      return addProjectsTaskSection({ projectId })
    },
    [addProjectsTaskSection, projectId],
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

  const deleteProjectTaskSection = useRecoilCallback(
    () => async (id: string) => {
      await deleteProjectTaskSectionCommand(id)
    },
    [deleteProjectTaskSectionCommand],
  )

  return {
    addTaskSection,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSectionAndDeleteTask,
    deleteProjectTaskSection,
  }
}
