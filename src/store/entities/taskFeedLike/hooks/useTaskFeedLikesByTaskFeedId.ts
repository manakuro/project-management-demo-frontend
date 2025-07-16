import { useMemo } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import {
  useCreateTaskFeedLikeMutation,
  useDeleteTaskFeedLikeMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, taskFeedLikeState, taskFeedLikesState } from '../atom'
import { TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedLikeCreatedSubscription'
import { TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedLikeDeletedSubscription'
import { useTaskFeedLikeResponse } from './useTaskFeedLikeResponse'
import { useUpsert } from './useUpsert'

export const useTaskFeedLikesByTaskFeedId = (
  taskFeedId: string,
  taskId: string,
) => {
  const { upsert } = useUpsert()
  const [taskFeedLikesAll] = useRecoilState(taskFeedLikesState)
  const { workspace } = useWorkspace()
  const { setTaskFeedLikes } = useTaskFeedLikeResponse()

  const [createTaskFeedLikeMutation] = useCreateTaskFeedLikeMutation()
  const [deleteTaskFeedLikeMutation] = useDeleteTaskFeedLikeMutation()

  const addTaskFeedLike = useRecoilCallback(
    ({ reset }) =>
      async (teammateId: string) => {
        const id = uuid()
        upsert({
          ...initialState(),
          id,
          taskFeedId,
          teammateId,
          taskId,
        })

        const restore = () => {
          reset(taskFeedLikeState(id))
        }

        setTimeout(async () => {
          try {
            const res = await createTaskFeedLikeMutation({
              variables: {
                input: {
                  teammateId,
                  taskFeedId,
                  taskId,
                  requestId: TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
                  workspaceId: workspace.id,
                },
              },
            })
            if (res.errors) {
              restore()
              return
            }

            const data = res.data?.createTaskFeedLike
            if (!data) return

            reset(taskFeedLikeState(id))
            setTaskFeedLikes([data])
          } catch (e) {
            restore()
            throw e
          }
        })

        return id
      },
    [
      createTaskFeedLikeMutation,
      setTaskFeedLikes,
      taskFeedId,
      taskId,
      upsert,
      workspace.id,
    ],
  )

  const deleteTaskFeedLike = useRecoilCallback(
    ({ snapshot, reset }) =>
      async (teammateId: string) => {
        const prev = await snapshot.getPromise(taskFeedLikesState)
        const taskFeedLike = prev.find(
          (f) => f.teammateId === teammateId && f.taskFeedId === taskFeedId,
        )
        if (!taskFeedLike) return

        reset(taskFeedLikeState(taskFeedLike.id))

        const restore = () => {
          setTaskFeedLikes([taskFeedLike])
        }

        setTimeout(async () => {
          try {
            const res = await deleteTaskFeedLikeMutation({
              variables: {
                input: {
                  id: taskFeedLike.id,
                  requestId: TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID,
                  workspaceId: workspace.id,
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
        })
      },
    [deleteTaskFeedLikeMutation, setTaskFeedLikes, taskFeedId, workspace.id],
  )

  const taskFeedLikes = useMemo(
    () => taskFeedLikesAll.filter((f) => f.taskFeedId === taskFeedId),
    [taskFeedLikesAll, taskFeedId],
  )
  const teammateIds = useMemo(
    () => taskFeedLikes.map((f) => f.teammateId),
    [taskFeedLikes],
  )

  return {
    addTaskFeedLike,
    deleteTaskFeedLike,
    taskFeedLikes,
    teammateIds,
  }
}
