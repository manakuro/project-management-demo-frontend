import React, { useCallback, useMemo, useState } from 'react'
import { FileUploaderParams, UploadedFile } from 'src/components/atoms'
import {
  useTaskDetail,
  useTaskDetailBody,
} from 'src/components/organisms/TaskDetail'
import { useClickOutside, useToast } from 'src/hooks'
import { getAttachmentTypeFromFile } from 'src/shared/getAttachmentTypeFromFile'
import { getScrollBottom } from 'src/shared/getScrollBottom'
import { createProvider } from 'src/shared/react/createProvider'
import {
  Attachment,
  useAttachmentCommand,
} from 'src/store/entities/attachments'
import { ATTACHMENT_STATUS_UNATTACHED } from 'src/store/entities/attachments/types'
import { Feed, useFeed, useFeedCommand } from 'src/store/entities/feeds'
import { useMe } from 'src/store/entities/me'

type ContextProps = {
  feed: Feed
  focused: boolean
  onChangeDescription: (val: string) => void
  onFocus: () => void
  onSave: () => void
  onUploadFile: (files: FileUploaderParams) => void
  ref: React.MutableRefObject<HTMLElement | null>
  attachmentIds: string[]
  uploadingFiles: {
    name: string
    num: number
  }[]
  hasAttachment: boolean
  onDeleteAttachment: (attachment: Attachment) => void
}

const useValue = (): ContextProps => {
  const { focused, setFocused, onFocus, ref } = useFocus()
  const [feedId, setFeedId] = useState<string>('')
  const { feed } = useFeed(feedId)
  const { hasAttachment, setAttachmentIds, attachmentIds, onDeleteAttachment } =
    useAttachmentFile()
  const { uploadingFiles, onUploadFile } = useUploadingFile({
    setAttachmentIds,
  })
  const { onSave, onChangeDescription } = useSave({
    onSaved: (id: string) => {
      setFeedId(id)
      setFocused(false)
    },
  })

  return {
    focused,
    onFocus,
    ref,
    onSave,
    onChangeDescription,
    feed,
    onUploadFile,
    attachmentIds,
    uploadingFiles,
    hasAttachment,
    onDeleteAttachment,
  }
}
useValue.__PROVIDER__ = 'CommentInputProvider'
export const { Provider, useContext: useInputContext } =
  createProvider(useValue)

function useAttachmentFile() {
  const [attachmentIds, setAttachmentIds] = useState<string[]>([])
  const { toast } = useToast()

  const hasAttachment = useMemo(() => !!attachmentIds.length, [attachmentIds])

  const onDelete = useCallback(
    (attachment: Attachment) => {
      setAttachmentIds((prev) => prev.filter((p) => p !== attachment.id))
      toast({
        description: `${attachment.name} is deleted from this task`,
      })
    },
    [toast],
  )

  return {
    attachmentIds,
    setAttachmentIds,
    hasAttachment,
    onDeleteAttachment: onDelete,
  }
}

function useUploadingFile(props: {
  setAttachmentIds: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const { taskId } = useTaskDetail()
  const { addAttachment } = useAttachmentCommand()
  const [uploadingFiles, setUploadingFiles] = useState<
    ContextProps['uploadingFiles']
  >([])

  const upsertUploadingFile = useCallback(
    (file: UploadedFile, num?: number) => {
      setUploadingFiles((prev) => {
        const uploadingFile = prev.find((p) => p.name === file.name) || {
          name: file.name,
          num: 0,
        }

        const index = prev.findIndex((p) => p.name === uploadingFile.name)
        const newValue = {
          ...uploadingFile,
          num: num ?? (uploadingFile.num === 80 ? 80 : uploadingFile.num + 20),
        }
        if (index === -1) return [...prev, newValue]

        return [...prev.slice(0, index), newValue, ...prev.slice(index + 1)]
      })
    },
    [],
  )

  const removeUploadingFile = useCallback((file: UploadedFile) => {
    setUploadingFiles((prev) => {
      const uploadingFile = prev.find((p) => p.name === file.name)!
      const index = prev.findIndex((prev) => prev.name === uploadingFile.name)
      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }, [])

  const onUploadFile = useCallback(
    async (files: FileUploaderParams) => {
      const promises: Promise<{
        createdAttachmentId: string
      }>[] = files.map(async (f) => {
        const file = await f

        upsertUploadingFile(file)

        return new Promise((resolve) => {
          const timeout = setInterval(() => {
            upsertUploadingFile(file)
          }, 3000)

          setTimeout(() => {
            const createdAttachmentId = addAttachment({
              taskId,
              src: file.data,
              name: file.name,
              type: getAttachmentTypeFromFile(file.type),
              status: ATTACHMENT_STATUS_UNATTACHED,
            })

            upsertUploadingFile(file, 100)

            setTimeout(() => {
              removeUploadingFile(file)
              clearInterval(timeout)

              resolve({
                createdAttachmentId,
              })
            }, 500)
          }, 2000)
        })
      })

      const result = await Promise.all(promises)
      props.setAttachmentIds((prev) => [
        ...prev,
        ...result.map((r) => r.createdAttachmentId),
      ])
      setUploadingFiles([])
    },
    [addAttachment, props, removeUploadingFile, taskId, upsertUploadingFile],
  )

  return {
    uploadingFiles,
    onUploadFile,
  }
}

function useFocus() {
  const [focused, setFocused] = useState(false)

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const { ref } = useClickOutside(() => {
    setFocused(false)
  })

  return {
    focused,
    setFocused,
    onFocus,
    ref,
  }
}

function useSave(props: { onSaved: (id: string) => void }) {
  const { taskId } = useTaskDetail()
  const { addFeed } = useFeedCommand()
  const { me } = useMe()
  const { taskDetailBodyDom } = useTaskDetailBody()
  const [description, setDescription] = useState<string>('')

  const scrollToBottom = useCallback(() => {
    if (!taskDetailBodyDom) return
    taskDetailBodyDom.scrollTop = getScrollBottom(taskDetailBodyDom)
  }, [taskDetailBodyDom])

  const onSave = useCallback(() => {
    const id = addFeed({
      taskId,
      description,
      teammateId: me.id,
      createdAt: new Date().toISOString(),
    })
    props.onSaved(id)
    scrollToBottom()
  }, [addFeed, description, me.id, props, scrollToBottom, taskId])

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val)
  }, [])

  return {
    onSave,
    onChangeDescription,
  }
}
