import React, { createContext, useCallback, useContext, useState } from 'react'
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
import { FileUploaderParams } from 'src/components/atoms'
import { getAttachmentTypeFromFile } from 'src/shared/getAttachmentTypeFromFile'

type ContextProps = {
  feed: Feed
  focused: boolean
  onChangeDescription: (val: string) => void
  onFocus: () => void
  onSave: () => void
  onUploadFile: (files: FileUploaderParams) => void
  ref: React.MutableRefObject<HTMLElement | null>
  attachmentIds: string[]
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
})
export const useInput = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const { taskId } = useTasksListDetail()
  const { addAttachment } = useAttachmentsByTask(taskId)
  const { addFeed } = useFeedsByTask(taskId)
  const { me } = useMe()
  const { taskDetailBodyDom } = useTaskDetailBody()

  const [focused, setFocused] = useState(false)
  const [description, setDescription] = useState<string>('')
  const [attachmentIds, setAttachmentIds] = useState<string[]>([])
  const [feedId, setFeedId] = useState<string>('')
  const { feed } = useFeed(feedId)

  const { ref } = useClickOutside(() => {
    setFocused(false)
  })

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const onChangeDescription = useCallback((val: string) => {
    setDescription(val)
  }, [])

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
    setFeedId(id)
    setFocused(false)
    scrollToBottom()
  }, [addFeed, description, me.id, scrollToBottom])

  const onUploadFile = useCallback(
    async (files: FileUploaderParams) => {
      const promises: Promise<{
        createdAttachmentId: string
      }>[] = files.map(async (f) => {
        const file = await f
        return new Promise((resolve) => {
          setTimeout(() => {
            const createdAttachmentId = addAttachment({
              src: file.data,
              name: file.name,
              type: getAttachmentTypeFromFile(file.type),
            })

            resolve({
              createdAttachmentId,
            })
          }, 2000)
        })
      })
      const result = await Promise.all(promises)
      setAttachmentIds(result.map((r) => r.createdAttachmentId))
    },
    [addAttachment],
  )

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
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
