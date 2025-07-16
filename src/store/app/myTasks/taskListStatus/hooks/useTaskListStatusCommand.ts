import { useRecoilCallback } from 'recoil'
import { useUpdateTeammateTaskListStatusMutation } from 'src/graphql/hooks'
import type { TaskListSortStatusCodeValue } from 'src/store/app/myTasks/taskListStatus'
import type { TaskListCompletedStatusCodeValue } from 'src/store/entities/taskListCompletedStatus'
import { useWorkspace } from 'src/store/entities/workspace'
import { taskListStatusState } from '../atom'
import { useUpsert } from './useUpsert'

export const useTaskListStatusCommand = () => {
  const { upsert } = useUpsert()
  const { workspace } = useWorkspace()

  const [updateTeammateTaskListStatusMutation] =
    useUpdateTeammateTaskListStatusMutation()

  const setTaskListCompletedStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { statusCode: TaskListCompletedStatusCodeValue }) => {
        const prev = await snapshot.getPromise(taskListStatusState)

        upsert({
          taskListCompletedStatus: {
            ...prev.taskListCompletedStatus,
            ...input,
          },
        })

        const restore = () => {
          upsert(prev)
        }

        try {
          const res = await updateTeammateTaskListStatusMutation({
            variables: {
              input: {
                id: prev.id,
                taskListCompletedStatusCode: input.statusCode,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }
          const data = res.data?.updateTeammateTaskListStatus
          if (!data) return

          upsert(data)
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateTeammateTaskListStatusMutation, upsert, workspace.id],
  )

  const setTaskListSortStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { statusCode: TaskListSortStatusCodeValue }) => {
        const prev = await snapshot.getPromise(taskListStatusState)

        upsert({
          taskListSortStatus: {
            ...prev.taskListSortStatus,
            ...input,
          },
        })

        const restore = () => {
          upsert(prev)
        }

        try {
          const res = await updateTeammateTaskListStatusMutation({
            variables: {
              input: {
                id: prev.id,
                taskListSortStatusCode: input.statusCode,
                requestId: '',
                workspaceId: workspace.id,
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }
          const data = res.data?.updateTeammateTaskListStatus
          if (!data) return

          upsert(data)
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateTeammateTaskListStatusMutation, upsert, workspace.id],
  )

  return {
    setTaskListCompletedStatus,
    setTaskListSortStatus,
  }
}
