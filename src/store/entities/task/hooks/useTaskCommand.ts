import { useCallback, useRef } from 'react'
import { useRecoilCallback } from 'recoil'
import {
  useDeleteTaskMutation,
  useUndeleteTaskMutation,
  useAssignTaskMutation,
  useUnassignTaskMutation,
  useCreateTaskMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import {
  DeletedTaskResponse,
  deletedTasksByTaskIdState,
  deletedTaskState,
  useDeletedTaskResponse,
} from 'src/store/entities/deletedTask'
import { useMe } from 'src/store/entities/me'
import {
  ProjectTaskResponse,
  projectTasksByTaskIdState,
  useProjectTaskResponse,
  useResetProjectTask,
} from 'src/store/entities/projectTask'
import { Task } from 'src/store/entities/task'
import {
  teammateTaskByTaskIdState,
  TeammateTaskResponse,
  teammateTaskState,
  useResetTeammateTask,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { useWorkspace } from 'src/store/entities/workspace'
import { taskState, initialState } from '../atom'
import { useResetTask } from './useResetTask'
import { TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID } from './useTaskAssignedSubscription'
import { TASK_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskDeletedSubscription'
import { useTasksResponse } from './useTaskResponse'
import { TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID } from './useTaskUnassignedSubscription'
import { TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskUndeletedSubscription'
import { useUpsert } from './useUpsert'

export const useTaskCommand = () => {
  const { upsert } = useUpsert()
  const { resetTask } = useResetTask()
  const { setTasksFromResponse } = useTasksResponse()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const [deleteTaskMutation] = useDeleteTaskMutation()
  const [undeleteTaskMutation] = useUndeleteTaskMutation()
  const [assignTaskMutation] = useAssignTaskMutation()
  const [unassignTaskMutation] = useUnassignTaskMutation()
  const [createTaskMutation] = useCreateTaskMutation()
  const { setTeammateTask } = useTeammateTaskResponse()
  const { resetTeammateTask } = useResetTeammateTask()
  const { setProjectTask } = useProjectTaskResponse()
  const { setDeletedTask } = useDeletedTaskResponse()
  const { resetProjectTasks } = useResetProjectTask()

  const setTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, input: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        upsert({ ...prev, ...input })
      },
    [upsert],
  )

  const unassignTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { id: string }) => {
        const prev = await snapshot.getPromise(taskState(input.id))
        await setTaskById(input.id, { assigneeId: '' })

        const restore = () => {
          setTaskById(input.id, prev)
        }

        try {
          const res = await unassignTaskMutation({
            variables: {
              input: {
                id: input.id,
                workspaceId: workspace.id,
                requestId: TASK_UNASSIGNED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }
          const data = res.data?.unassignTask
          if (!data) return

          resetTeammateTask(data.teammateTaskId)
        } catch (e) {
          restore()
          throw e
        }
      },
    [resetTeammateTask, setTaskById, unassignTaskMutation, workspace.id],
  )

  const assignTask = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { id: string; assigneeId: string }) => {
        const prev = await snapshot.getPromise(taskState(input.id))

        if (
          prev.assigneeId &&
          input.assigneeId &&
          prev.assigneeId === input.assigneeId
        )
          return

        await setTaskById(input.id, { assigneeId: input.assigneeId })

        const restore = () => {
          setTaskById(input.id, prev)
        }

        try {
          const res = await assignTaskMutation({
            variables: {
              input: {
                id: input.id,
                assigneeId: input.assigneeId,
                workspaceId: workspace.id,
                requestId: TASK_ASSIGNED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }
          const data = res.data?.assignTask
          if (!data) return

          setTeammateTask([data.teammateTask])
        } catch (e) {
          restore()
          throw e
        }
      },
    [assignTaskMutation, setTaskById, setTeammateTask, workspace.id],
  )

  const addTask = useCallback(
    (val?: Partial<Task>) => {
      const id = uuid()
      upsert({
        ...initialState(),
        ...val,
        id,
        isNew: true,
        createdBy: me.id,
      })

      return id
    },
    [me.id, upsert],
  )

  const addSubtask = useRecoilCallback(
    () => async (input: { taskParentId: string }) => {
      const newTaskId = addTask({
        taskParentId: input.taskParentId,
      })

      const restore = () => {
        resetTask(newTaskId)
      }

      try {
        const res = await createTaskMutation({
          variables: {
            input: {
              createdBy: me.id,
              taskParentId: input.taskParentId,
              workspaceId: workspace.id,
              requestId: '',
            },
          },
        })
        if (res.errors) {
          restore()
          return ''
        }

        const data = res.data?.createTask
        if (!data) return ''

        resetTask(newTaskId)
        setTasksFromResponse([data])
      } catch (e) {
        restore()
        throw e
      }
    },
    [
      addTask,
      createTaskMutation,
      me.id,
      resetTask,
      setTasksFromResponse,
      workspace.id,
    ],
  )

  const isDeletingTask = useRef<boolean>(false)
  const deleteTask = useRecoilCallback(
    ({ snapshot, reset }) =>
      async (input: { taskId: string }) => {
        if (isDeletingTask.current) return

        isDeletingTask.current = true

        const teammateTask = await snapshot.getPromise(
          teammateTaskByTaskIdState(input.taskId),
        )
        if (teammateTask.id) {
          reset(teammateTaskState(teammateTask.id))
        }

        const projectTasks = await snapshot.getPromise(
          projectTasksByTaskIdState(input.taskId),
        )
        if (projectTasks.length) {
          resetProjectTasks(projectTasks.map((p) => p.id))
        }

        const restore = () => {
          if (teammateTask.id)
            setTeammateTask([teammateTask as TeammateTaskResponse])
          if (projectTasks.length)
            setProjectTask(projectTasks as ProjectTaskResponse[])
        }

        try {
          const res = await deleteTaskMutation({
            variables: {
              input: {
                taskId: input.taskId,
                workspaceId: workspace.id,
                requestId: TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }

          const data = res.data?.deleteTask?.deletedTasks
          if (!data) return

          setDeletedTask(data, { includeTask: false })
        } catch (e) {
          restore()
          throw e
        } finally {
          isDeletingTask.current = false
        }
      },
    [
      deleteTaskMutation,
      resetProjectTasks,
      setDeletedTask,
      setProjectTask,
      setTeammateTask,
      workspace.id,
    ],
  )

  const undeleteTask = useRecoilCallback(
    ({ snapshot, reset }) =>
      async (input: { taskId: string }) => {
        const deletedTasks = await snapshot.getPromise(
          deletedTasksByTaskIdState(input.taskId),
        )
        deletedTasks.forEach((d) => {
          reset(deletedTaskState(d.id))
        })

        const restore = () => {
          setDeletedTask(deletedTasks as DeletedTaskResponse[])
        }

        try {
          const res = await undeleteTaskMutation({
            variables: {
              input: {
                taskId: input.taskId,
                workspaceId: workspace.id,
                requestId: TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }

          const teammateTask = res.data?.undeleteTask?.teammateTask
          if (teammateTask) setTeammateTask([teammateTask])

          const projectTasks = res.data?.undeleteTask?.projectTasks
          if (projectTasks?.length)
            setProjectTask(projectTasks, { includeTask: false })
        } catch (e) {
          restore()
          throw e
        }
      },
    [
      setDeletedTask,
      setProjectTask,
      setTeammateTask,
      undeleteTaskMutation,
      workspace.id,
    ],
  )

  return {
    addTask,
    assignTask,
    unassignTask,
    setTaskById,
    deleteTask,
    undeleteTask,
    addSubtask,
  }
}
