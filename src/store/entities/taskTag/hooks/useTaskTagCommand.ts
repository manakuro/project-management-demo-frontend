import { useRecoilCallback } from 'recoil'
import {
  useCreateTaskTagMutation,
  useDeleteTaskTagMutation,
} from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { Tag } from 'src/store/entities/tag'
import {
  taskTagByTaskIdAndTagIdState,
  taskTagState,
} from 'src/store/entities/taskTag'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState } from '../atom'
import { useResetTaskTag } from './useResetTaskTag'
import { useTaskTagResponse } from './useTaskTagResponse'
import { useUpsert } from './useUpsert'

export const useTaskTagCommand = () => {
  const [createTaskTagMutation] = useCreateTaskTagMutation()
  const [deleteTaskTagMutation] = useDeleteTaskTagMutation()
  const { setTaskTag } = useTaskTagResponse()
  const { upsert } = useUpsert()
  const { resetTaskTag } = useResetTaskTag()
  const { workspace } = useWorkspace()

  const addTaskTag = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { tag: Tag; taskId: string }) => {
        const release = snapshot.retain()
        const taskTag = await snapshot.getPromise(
          taskTagByTaskIdAndTagIdState({
            taskId: input.taskId,
            tagId: input.tag.id,
          }),
        )
        if (taskTag.id) return

        const id = uuid()
        upsert({
          ...initialState(),
          id,
          tagId: input.tag.id,
          tag: input.tag,
          taskId: input.taskId,
        })

        const restore = () => {
          resetTaskTag(id)
        }

        try {
          const res = await createTaskTagMutation({
            variables: {
              input: {
                tagId: input.tag.id,
                taskId: input.taskId,
                workspaceId: workspace.id,
                requestId: '',
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }

          const data = res.data?.createTaskTag
          if (!data) return

          resetTaskTag(id)
          await setTaskTag([data])
        } catch (e) {
          restore()
          throw e
        } finally {
          release()
        }
      },
    [createTaskTagMutation, resetTaskTag, setTaskTag, upsert, workspace.id],
  )

  const deleteTaskTag = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { id: string }) => {
        const release = snapshot.retain()
        const prev = await snapshot.getPromise(taskTagState(input.id))

        resetTaskTag(input.id)

        const restore = () => {
          setTaskTag([prev])
        }

        try {
          const res = await deleteTaskTagMutation({
            variables: {
              input: {
                id: input.id,
                workspaceId: workspace.id,
                requestId: '',
              },
            },
          })
          if (res.errors) {
            restore()
            return
          }
        } catch (e) {
          restore()
          throw e
        } finally {
          release()
        }
      },
    [deleteTaskTagMutation, resetTaskTag, setTaskTag, workspace.id],
  )

  return {
    addTaskTag,
    deleteTaskTag,
  }
}
