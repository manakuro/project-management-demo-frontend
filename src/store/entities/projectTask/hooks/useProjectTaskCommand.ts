import { useRecoilCallback } from 'recoil'
import {
  useCreateProjectTaskMutation,
  useUpdateProjectTaskMutation,
  useCreateProjectTaskByTaskIdMutation,
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
import { useResetProjectTask } from './useResetProjectTask'
import { useUpsert } from './useUpsert'

type AddProjectTaskInput = Partial<ProjectTask> & {
  projectId: string
  projectTaskSectionId: string
  taskParentId?: string
}

export const useProjectTaskCommand = () => {
  const { addTask } = useTaskCommand()
  const [createProjectTaskMutation] = useCreateProjectTaskMutation()
  const [createProjectTaskByTaskIdMutation] =
    useCreateProjectTaskByTaskIdMutation()
  const [updateProjectTaskMutation] = useUpdateProjectTaskMutation()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const { setProjectTask: setProjectTaskResponse } = useProjectTaskResponse()
  const { upsert } = useUpsert()
  const { resetProjectTask } = useResetProjectTask()

  const resetTask = useRecoilCallback(
    ({ reset }) =>
      (params: { taskId: string; projectTaskId: string }) => {
        reset(projectTaskState(params.projectTaskId))
        reset(taskState(params.taskId))
      },
    [],
  )

  const setProjectTaskByTaskId = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, input: Partial<ProjectTask>) => {
        const prev = await snapshot.getPromise(projectTaskByTaskIdState(taskId))
        upsert({ ...prev, ...input })

        const restore = () => {
          upsert(prev)
        }

        try {
          const res = await updateProjectTaskMutation({
            variables: {
              input: {
                ...input,
                id: prev.id,
                workspaceId: workspace.id,
                requestId: PROJECT_TASK_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
          }
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateProjectTaskMutation, upsert, workspace.id],
  )

  const addProjectTaskOptimistic = useRecoilCallback(
    () => (input: AddProjectTaskInput) => {
      const newProjectTaskId = uuid()
      const newTaskId = addTask({
        taskParentId: input.taskParentId || '',
      })
      const newProjectTask = {
        ...initialState(),
        ...input,
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
    () => async (input: AddProjectTaskInput) => {
      const { newTaskId, newProjectTask, newProjectTaskId } =
        addProjectTaskOptimistic(input)

      const restore = () => {
        resetTask({ taskId: newTaskId, projectTaskId: newProjectTaskId })
      }

      try {
        const res = await createProjectTaskMutation({
          variables: {
            input: {
              projectId: newProjectTask.projectId,
              projectTaskSectionId: newProjectTask.projectTaskSectionId,
              createdBy: me.id,
              taskParentId: input.taskParentId ?? null,
              requestId: PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
              workspaceId: workspace.id,
            },
          },
        })
        if (res.errors) {
          restore()
          return ''
        }

        const addedProjectTask = res.data?.createProjectTask
        if (!addedProjectTask) return ''

        resetTask({ taskId: newTaskId, projectTaskId: newProjectTaskId })
        setProjectTaskResponse([addedProjectTask])

        return addedProjectTask.id
      } catch (e) {
        restore()
        throw e
      }
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

  const addProjectTaskByTaskId = useRecoilCallback(
    () => async (input: { projectId: string; taskId: string }) => {
      const newProjectTaskId = uuid()
      upsert({
        ...initialState(),
        taskId: input.taskId,
        projectId: input.projectId,
        id: newProjectTaskId,
      })

      const restore = () => {
        resetProjectTask(newProjectTaskId)
      }

      try {
        const res = await createProjectTaskByTaskIdMutation({
          variables: {
            input: {
              projectId: input.projectId,
              taskId: input.taskId,
              requestId: PROJECT_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
              workspaceId: workspace.id,
            },
          },
        })
        if (res.errors) {
          restore()
          return ''
        }

        const addedProjectTask = res.data?.createProjectTaskByTaskId
        if (!addedProjectTask) return ''

        resetProjectTask(newProjectTaskId)
        setProjectTaskResponse([addedProjectTask])

        return addedProjectTask.id
      } catch (e) {
        restore()
        throw e
      }
    },
    [
      createProjectTaskByTaskIdMutation,
      resetProjectTask,
      setProjectTaskResponse,
      upsert,
      workspace.id,
    ],
  )

  return {
    addProjectTask,
    addProjectTaskByTaskId,
    setProjectTaskByTaskId,
  }
}
