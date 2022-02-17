import { useRecoilCallback } from 'recoil'
import { useCreateProjectTaskMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useMe } from 'src/store/entities/me'
import { taskState, useTaskCommand } from 'src/store/entities/task'
import { projectTaskState, initialState } from '../atom'
import { ProjectTask } from '../type'
import { useProjectTaskCreatedSubscription } from './useProjectTaskCreatedSubscription'
import { useProjectTaskResponse } from './useProjectTaskResponse'

type AddProjectTaskParams = Partial<ProjectTask> & {
  projectTaskSectionId: string
}

export const useProjectTaskCommand = () => {
  const { addTask } = useTaskCommand()
  const [createProjectTaskMutation] = useCreateProjectTaskMutation()
  const { me } = useMe()
  const { setProjectTask } = useProjectTaskResponse()
  const { projectId } = useProjectsProjectId()

  useProjectTaskCreatedSubscription({
    projectId,
  })

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: ProjectTask) => {
        set(projectTaskState(val.id), val)
      },
    [],
  )

  const resetTask = useRecoilCallback(
    ({ reset }) =>
      (params: { taskId: string; projectTaskId: string }) => {
        reset(projectTaskState(params.projectTaskId))
        reset(taskState(params.taskId))
      },
    [],
  )
  const addProjectTaskOptimistic = useRecoilCallback(
    () => (params: AddProjectTaskParams) => {
      const newProjectTaskId = uuid()
      const newTaskId = addTask({
        taskSectionId: params.projectTaskSectionId,
      })
      const newProjectTask = {
        ...initialState(),
        ...params,
        id: newProjectTaskId,
        taskId: newTaskId,
      }

      upsert(newProjectTask)

      return {
        newProjectTask,
        newProjectTaskId,
        newTaskId,
      }
    },
    [addTask, upsert],
  )

  const addProjectTask = useRecoilCallback(
    () => async (params: AddProjectTaskParams) => {
      const { newTaskId, newProjectTask, newProjectTaskId } =
        addProjectTaskOptimistic(params)

      const res = await createProjectTaskMutation({
        variables: {
          input: {
            projectId: newProjectTask.projectId,
            projectTaskSectionId: newProjectTask.projectTaskSectionId,
            createdBy: me.id,
          },
        },
      })
      if (res.errors) {
        resetTask({ taskId: newTaskId, projectTaskId: newProjectTaskId })
        return ''
      }

      const addedProjectTask = res.data?.createProjectTask
      if (!addedProjectTask) return ''

      resetTask({ taskId: newTaskId, projectTaskId: newProjectTaskId })
      setProjectTask([addedProjectTask])

      return addedProjectTask.id
    },
    [
      createProjectTaskMutation,
      me.id,
      resetTask,
      setProjectTask,
      addProjectTaskOptimistic,
    ],
  )

  return {
    addProjectTask,
  }
}
