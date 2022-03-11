import { useRecoilCallback } from 'recoil'
import { useCreateTaskTagMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { Tag } from 'src/store/entities/tag'
import { taskTagByTaskIdAndTagIdState } from 'src/store/entities/taskTag'
import { initialState } from '../atom'
import { useResetTaskTag } from './useResetTaskTag'
import { useTaskTagResponse } from './useTaskTagResponse'
import { useUpsert } from './useUpsert'

export const useTaskTagCommand = () => {
  const [createTaskTagMutation] = useCreateTaskTagMutation()
  const { setTaskTag } = useTaskTagResponse()
  const { upsert } = useUpsert()
  const { resetTaskTag } = useResetTaskTag()

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
    [createTaskTagMutation, resetTaskTag, setTaskTag, upsert],
  )

  return {
    addTaskTag,
  }
}
