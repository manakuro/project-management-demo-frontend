import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { useTasksCommand } from 'src/store/entities/tasks'
import { projectTaskState, initialState } from '../atom'
import { ProjectTask } from '../type'

export const useProjectTaskCommand = () => {
  const { addTask } = useTasksCommand()
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectTask) => {
        set(projectTaskState(val.id), val)
      },
    [],
  )

  const addProjectTask = useRecoilCallback(
    () => (val: Partial<ProjectTask> & { projectTaskSectionId: string }) => {
      const id = uuid()
      const newTaskId = addTask({
        taskSectionId: val.projectTaskSectionId,
      })
      const newProjectTask = {
        ...initialState(),
        ...val,
        taskId: newTaskId,
      }

      upsert(newProjectTask)
      return id
    },
    [addTask, upsert],
  )

  return {
    addProjectTask,
  }
}
