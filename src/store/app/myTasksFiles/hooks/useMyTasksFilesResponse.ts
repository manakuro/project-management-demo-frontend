import { useRecoilCallback } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { MyTaskFileResponse } from 'src/store/app/myTasksFiles/type'
import { Attachment, attachmentState } from 'src/store/entities/attachments'
import { useTasksCommand } from 'src/store/entities/tasks'

export const useMyTasksFilesResponse = () => {
  const { setAttachment, setTaskStatus } = useSetters()

  const setMyTasksAttachments = useRecoilCallback(
    () => async (data: MyTaskFileResponse[]) => {
      setAttachment(data)
      await setTaskStatus(data)
    },
    [setAttachment, setTaskStatus],
  )

  return {
    setMyTasksAttachments,
  }
}

const useSetters = () => {
  const { setTaskById } = useTasksCommand()
  const setAttachment = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskFileResponse[]) => {
        const attachments: Attachment[] = data.map(({ task, ...rest }) => rest)

        attachments.forEach((a) => {
          set(attachmentState(a.id), a)
        })
      },
    [],
  )

  const setTaskStatus = useRecoilCallback(
    () => async (data: MyTaskFileResponse[]) => {
      const tasks: MyTaskFileResponse['task'][] = data.map(({ task }) => task)

      await asyncForEach(tasks, async (t) => {
        await setTaskById(t.id, t)
      })
    },
    [setTaskById],
  )

  return {
    setAttachment,
    setTaskStatus,
  }
}
