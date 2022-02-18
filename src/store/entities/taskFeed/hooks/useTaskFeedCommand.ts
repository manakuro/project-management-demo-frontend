import { useRecoilCallback } from 'recoil'
import {
  useCreateTaskFeedMutation,
  useDeleteTaskFeedMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { initialState, taskFeedState } from '../atom'
import { TaskFeed } from '../type'
import { useReset } from './useReset'
import { TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedCreatedSubscription'
import { TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedDeletedSubscription'
import { useTaskFeedResponse } from './useTaskFeedResponse'
import { useUpsert } from './useUpsert'

export const useTaskFeedCommand = () => {
  const { upsert } = useUpsert()
  const [createTaskFeedMutation] = useCreateTaskFeedMutation()
  const [deleteTaskFeedMutation] = useDeleteTaskFeedMutation()

  const { resetTaskFeed } = useReset()
  const { setTaskFeed } = useTaskFeedResponse()

  const addTaskFeed = useRecoilCallback(
    () =>
      async (val: Pick<TaskFeed, 'taskId' | 'teammateId' | 'description'>) => {
        const id = uuid()
        upsert({
          ...initialState(),
          ...val,
          id,
        })

        const res = await createTaskFeedMutation({
          variables: {
            input: {
              taskId: val.taskId,
              teammateId: val.teammateId,
              description: val.description,
              requestId: TASK_FEED_CREATED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          resetTaskFeed(id)
          return ''
        }

        const data = res.data?.createTaskFeed
        if (!data) return ''

        resetTaskFeed(id)
        setTaskFeed([data])

        return data.id
      },
    [upsert, createTaskFeedMutation, resetTaskFeed, setTaskFeed],
  )

  const deleteTaskFeed = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Pick<TaskFeed, 'id'>) => {
        const prev = await snapshot.getPromise(taskFeedState(val.id))

        resetTaskFeed(val.id)

        const res = await deleteTaskFeedMutation({
          variables: {
            input: {
              id: val.id,
              requestId: TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID,
            },
          },
        })
        if (res.errors) {
          setTaskFeed([prev])
          return ''
        }

        return res.data?.deleteTaskFeed?.id || ''
      },
    [resetTaskFeed, deleteTaskFeedMutation, setTaskFeed],
  )

  return {
    addTaskFeed,
    deleteTaskFeed,
  }
}
