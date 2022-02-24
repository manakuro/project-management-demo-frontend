import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import {
  useDeleteTaskMutation,
  useUndeleteTaskMutation,
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
  projectTaskByTaskIdState,
  ProjectTaskResponse,
  projectTaskState,
  useProjectTaskResponse,
} from 'src/store/entities/projectTask'
import { Task } from 'src/store/entities/task'
import {
  teammateTaskByTaskIdState,
  TeammateTaskResponse,
  teammateTaskState,
  useTeammateTaskResponse,
} from 'src/store/entities/teammateTask'
import { useWorkspace } from 'src/store/entities/workspace'
import { taskState, initialState } from '../atom'
import { TASK_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskDeletedSubscription'
import { TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskUndeletedSubscription'
import { useUpsert } from './useUpsert'

export const useTaskCommand = () => {
  const { upsert } = useUpsert()
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const [deleteTaskMutation] = useDeleteTaskMutation()
  const [undeleteTaskMutation] = useUndeleteTaskMutation()
  const { setTeammateTask } = useTeammateTaskResponse()
  const { setProjectTask } = useProjectTaskResponse()
  const { setDeletedTask } = useDeletedTaskResponse()

  const setTaskById = useRecoilCallback(
    ({ snapshot }) =>
      async (taskId: string, val: Partial<Task>) => {
        const prev = await snapshot.getPromise(taskState(taskId))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  const addTask = useCallback(
    (val?: Partial<Task> & { taskSectionId: string }) => {
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

  const deleteTask = useRecoilCallback(
    ({ snapshot, reset }) =>
      async (val: { taskId: string }) => {
        const teammateTask = await snapshot.getPromise(
          teammateTaskByTaskIdState(val.taskId),
        )
        if (teammateTask.id) {
          reset(teammateTaskState(teammateTask.id))
        }

        const projectTask = await snapshot.getPromise(
          projectTaskByTaskIdState(val.taskId),
        )
        if (projectTask.id) {
          reset(projectTaskState(projectTask.id))
        }

        const res = await deleteTaskMutation({
          variables: {
            input: {
              taskId: val.taskId,
              workspaceId: teammateTask.workspaceId,
              requestId: TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          setTeammateTask([teammateTask as TeammateTaskResponse])
          setProjectTask([projectTask as ProjectTaskResponse])
          return
        }

        const data = res.data?.deleteTask?.deletedTasks
        if (!data) return

        setDeletedTask(data)
      },
    [deleteTaskMutation, setDeletedTask, setProjectTask, setTeammateTask],
  )

  const undeleteTask = useRecoilCallback(
    ({ snapshot, reset }) =>
      async (val: { taskId: string }) => {
        const deletedTasks = await snapshot.getPromise(
          deletedTasksByTaskIdState(val.taskId),
        )
        deletedTasks.forEach((d) => {
          reset(deletedTaskState(d.id))
        })

        const res = await undeleteTaskMutation({
          variables: {
            input: {
              taskId: val.taskId,
              workspaceId: workspace.id,
              requestId: TASK_UNDELETED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          setDeletedTask(deletedTasks as DeletedTaskResponse[])
          return
        }

        const teammateTask = res.data?.undeleteTask?.teammateTask
        if (teammateTask) {
          setTeammateTask([teammateTask])
        }

        const projectTask = res.data?.undeleteTask?.projectTask
        if (projectTask) {
          setProjectTask([projectTask])
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
    setTaskById,
    deleteTask,
    undeleteTask,
  }
}
