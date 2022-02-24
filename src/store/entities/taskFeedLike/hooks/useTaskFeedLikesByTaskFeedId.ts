import { useMemo } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import {
  useCreateTaskFeedLikeMutation,
  useDeleteTaskFeedLikeMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, taskFeedLikesState, taskFeedLikeState } from '../atom'
import { useTaskFeedLikeCommand } from './useTaskFeedLikeCommand'
import { TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedLikeCreatedSubscription'
import { TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedLikeDeletedSubscription'
import { useTaskFeedLikeResponse } from './useTaskFeedLikeResponse'

export const useTaskFeedLikesByTaskFeedId = (
  taskFeedId: string,
  taskId: string,
) => {
  const { upsert } = useTaskFeedLikeCommand()
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

        setTimeout(async () => {
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
            reset(taskFeedLikeState(id))
            return
          }

          const data = res.data?.createTaskFeedLike
          if (!data) return

          reset(taskFeedLikeState(id))
          setTaskFeedLikes([data])
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

        setTimeout(async () => {
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
            setTaskFeedLikes([taskFeedLike])
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
