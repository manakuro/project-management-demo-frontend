import { useMemo } from 'react'
import { selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { asyncForEach } from 'src/shared/utils'
import { MyTaskFileResponse } from 'src/store/app/myTasksFiles/type'
import {
  Attachment,
  attachmentSelector,
  attachmentsState,
} from 'src/store/entities/attachments'
import { useMe } from 'src/store/entities/me'
import {
  taskIdsByAssigneeIdSelector,
  useTasksCommand,
} from 'src/store/entities/tasks'

const key = (str: string) => `src/store/app/myTasks/attachments/${str}`

export const myTasksAttachmentsSelector = selectorFamily<string[], string>({
  key: key('myTasksAttachmentsSelector'),
  get:
    (teammateId: string) =>
    ({ get }) => {
      const attachments = get(attachmentsState)
      const taskIds = get(taskIdsByAssigneeIdSelector(teammateId))
      return attachments
        .filter((a) => taskIds.includes(a.taskId))
        .map((a) => a.id)
    },
})

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

export const useMyTasksFiles = () => {
  const { me } = useMe()
  const ids = useRecoilValue(myTasksAttachmentsSelector(me.id))
  const attachmentIds = useMemo(() => ids, [ids])

  return {
    attachmentIds,
  }
}

const useSetters = () => {
  const { setTaskById } = useTasksCommand()
  const setAttachment = useRecoilCallback(
    ({ set }) =>
      (data: MyTaskFileResponse[]) => {
        const attachments: Attachment[] = data.map(({ task, ...rest }) => rest)

        attachments.forEach((a) => {
          set(attachmentSelector(a.id), a)
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