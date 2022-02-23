import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { useDeleteTaskMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useDeletedTaskResponse } from 'src/store/entities/deletedTask'
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
import { taskState, initialState } from '../atom'
import { TASK_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskDeletedSubscription'
import { useUpsert } from './useUpsert'

export const useTaskCommand = () => {
  const { upsert } = useUpsert()
  const { me } = useMe()
  const [deleteTaskMutation] = useDeleteTaskMutation()
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
  )

  return {
    addTask,
    setTaskById,
    deleteTask,
  }
}
