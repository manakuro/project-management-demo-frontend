import { useRecoilCallback } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { Attachment, attachmentState } from 'src/store/entities/attachments'
import { useTasksCommand } from 'src/store/entities/tasks'
import { ProjectsFileResponse } from '../type'

export const useProjectsFilesResponse = () => {
  const { setAttachment, setTaskStatus } = useSetters()

  const setProjectsAttachments = useRecoilCallback(
    () => async (data: ProjectsFileResponse[]) => {
      setAttachment(data)
      await setTaskStatus(data)
    },
    [setAttachment, setTaskStatus],
  )

  return {
    setProjectsAttachments,
  }
}

const useSetters = () => {
  const { setTaskById } = useTasksCommand()
  const setAttachment = useRecoilCallback(
    ({ set }) =>
      (data: ProjectsFileResponse[]) => {
        const attachments: Attachment[] = data.map(({ task, ...rest }) => rest)

        attachments.forEach((a) => {
          set(attachmentState(a.id), a)
        })
      },
    [],
  )

  const setTaskStatus = useRecoilCallback(
    () => async (data: ProjectsFileResponse[]) => {
      const tasks: ProjectsFileResponse['task'][] = data.map(({ task }) => task)

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
