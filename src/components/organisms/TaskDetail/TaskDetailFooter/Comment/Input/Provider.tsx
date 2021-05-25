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

type ContextProps = {
  focused: boolean
  ref: React.MutableRefObject<HTMLElement | null>
  onFocus: () => void
  onSave: () => void
  onChangeDescription: (val: string) => void
  feed: Feed
}

const Context = createContext<ContextProps>({
  ref: null as any,
  focused: false,
  onFocus: () => void {},
  onSave: () => void {},
  onChangeDescription: () => void {},
  feed: defaultFeedStateValue(),
})
export const useInput = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const { taskId } = useTasksListDetail()
  const { addFeed } = useFeedsByTask(taskId)
  const { me } = useMe()
  const { taskDetailBodyDom } = useTaskDetailBody()

  const [focused, setFocused] = useState(false)
  const [description, setDescription] = useState<string>('')
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

  return (
    <Context.Provider
      value={{
        focused,
        onFocus,
        ref,
        onSave,
        onChangeDescription,
        feed,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
