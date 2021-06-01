import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useClickOutside } from 'src/hooks'
import {
  defaultFeedStateValue,
  Feed,
  useFeed,
  useFeedsByTask,
} from 'src/store/feeds'
import { useTasksListDetail } from 'src/components/organisms'
import { useMe } from 'src/store/me'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'
import { getScrollBottom } from 'src/shared/getScrollBottom'
import { useAttachmentsByTask } from 'src/store/attachments'
import { FileUploaderParams, UploadedFile } from 'src/components/atoms'
import { getAttachmentTypeFromFile } from 'src/shared/getAttachmentTypeFromFile'
import { ATTACHMENT_STATUS_UNATTACHED } from 'src/store/attachments/types'

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
}

const Context = createContext<ContextProps>({
  feed: defaultFeedStateValue(),
  focused: false,
  onChangeDescription: () => void {},
  onFocus: () => void {},
  onSave: () => void {},
  onUploadFile: () => void {},
  ref: null as any,
  attachmentIds: [],
  uploadingFiles: [],
  hasAttachment: false,
})
export const useInput = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const { focused, setFocused, onFocus, ref } = useFocus()
  const [feedId, setFeedId] = useState<string>('')
  const { feed } = useFeed(feedId)
  const { uploadingFiles, hasAttachment, onUploadFile, attachmentIds } =
    useUploadingFile()
  const { onSave, onChangeDescription } = useSave({
    onSaved: (id: string) => {
      setFeedId(id)
      setFocused(false)
    },
  })

  return (
    <Context.Provider
      value={{
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
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

function useUploadingFile() {
  const { taskId } = useTasksListDetail()
  const { addAttachment } = useAttachmentsByTask(taskId)
  const [uploadingFiles, setUploadingFiles] = useState<
    ContextProps['uploadingFiles']
  >([])
  const [attachmentIds, setAttachmentIds] = useState<string[]>([])

  const hasAttachment = useMemo(() => !!attachmentIds.length, [attachmentIds])

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
      setAttachmentIds((prev) => [
        ...prev,
        ...result.map((r) => r.createdAttachmentId),
      ])
      setUploadingFiles([])
    },
    [addAttachment, removeUploadingFile, upsertUploadingFile],
  )

  return {
    uploadingFiles,
    onUploadFile,
    hasAttachment,
    attachmentIds,
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
  const { taskId } = useTasksListDetail()
  const { addFeed } = useFeedsByTask(taskId)
  const { me } = useMe()
  const { taskDetailBodyDom } = useTaskDetailBody()
  const [description, setDescription] = useState<string>('')

  const scrollToBottom = useCallback(() => {
    if (!taskDetailBodyDom) return
    taskDetailBodyDom.scrollTop = getScrollBottom(taskDetailBodyDom)
  }, [taskDetailBodyDom])

  const onSave = useCallback(() => {
    const id = addFeed({
      description,
      teammateId: me.id,
      createdAt: new Date().toISOString(),
    })
    props.onSaved(id)
    scrollToBottom()
  }, [addFeed, description, me.id, props, scrollToBottom])

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val)
  }, [])

  return {
    onSave,
    onChangeDescription,
  }
}
