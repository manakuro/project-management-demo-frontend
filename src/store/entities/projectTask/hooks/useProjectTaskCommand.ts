import { useRecoilCallback } from 'recoil'
import {
  useCreateProjectTaskMutation,
  useUpdateProjectTaskMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useMe } from 'src/store/entities/me'
import { taskState, useTaskCommand } from 'src/store/entities/task'
import { useWorkspace } from 'src/store/entities/workspace'
import {
  projectTaskState,
  initialState,
  projectTaskByTaskIdState,
} from '../atom'
import { ProjectTask } from '../type'
import { PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskCreatedSubscription'
import { useProjectTaskResponse } from './useProjectTaskResponse'
import { PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskUpdatedSubscription'
import { useUpsert } from './useUpsert'

type AddProjectTaskParams = Partial<ProjectTask> & {
  projectTaskSectionId: string
}

export const useProjectTaskCommand = () => {
  const { addTask } = useTaskCommand()
  const [createProjectTaskMutation] = useCreateProjectTaskMutation()
  const [updateProjectTaskMutation] = useUpdateProjectTaskMutation()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const { setProjectTask: setProjectTaskResponse } = useProjectTaskResponse()
  const { upsert } = useUpsert()
  const { setTaskSectionId } = useTaskCommand()

  const resetTask = useRecoilCallback(
    ({ reset }) =>
      (params: { taskId: string; projectTaskId: string }) => {
        reset(projectTaskState(params.projectTaskId))
        reset(taskState(params.taskId))
      },
    [],
  )

  const setProjectTaskOptimistic = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<ProjectTask>) => {
        const prev = await snapshot.getPromise(projectTaskByTaskIdState(taskId))
        upsert({ ...prev, ...val })
      },
    [upsert],
  )

  const setProjectTaskByTaskId = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<ProjectTask>) => {
        const prev = await snapshot.getPromise(projectTaskByTaskIdState(taskId))
        upsert({ ...prev, ...val })

        const res = await updateProjectTaskMutation({
          variables: {
            input: {
              ...val,
              id: prev.id,
              workspaceId: workspace.id,
              requestId: PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          upsert(prev)
          return
        }
      },
    [updateProjectTaskMutation, upsert, workspace.id],
  )

  const setProjectTaskSectionId = useRecoilCallback(
    () => async (taskId: string, val: string) => {
      await setProjectTaskOptimistic(taskId, {
        projectTaskSectionId: val,
      })
      await setTaskSectionId(taskId, val)
      await setProjectTaskByTaskId(taskId, {
        projectTaskSectionId: val,
      })
    },
    [setProjectTaskByTaskId, setProjectTaskOptimistic, setTaskSectionId],
  )

  const addProjectTaskOptimistic = useRecoilCallback(
    () => (val: AddProjectTaskParams) => {
      const newProjectTaskId = uuid()
      const newTaskId = addTask({
        taskSectionId: val.projectTaskSectionId,
      })
      const newProjectTask = {
        ...initialState(),
        ...val,
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
    () => async (val: AddProjectTaskParams) => {
      const { newTaskId, newProjectTask, newProjectTaskId } =
        addProjectTaskOptimistic(val)

      const res = await createProjectTaskMutation({
        variables: {
          input: {
            projectId: newProjectTask.projectId,
            projectTaskSectionId: newProjectTask.projectTaskSectionId,
            createdBy: me.id,
            requestId: PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
            workspaceId: workspace.id,
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
      setProjectTaskResponse([addedProjectTask])

      return addedProjectTask.id
    },
    [
      addProjectTaskOptimistic,
      createProjectTaskMutation,
      me.id,
      workspace.id,
      resetTask,
      setProjectTaskResponse,
    ],
  )

  return {
    addProjectTask,
    setProjectTaskByTaskId,
    setProjectTaskSectionId,
  }
}
