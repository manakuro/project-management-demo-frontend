import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'
import { useTasksRouter } from 'src/components/organisms/Tasks/hooks'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { createProvider } from 'src/shared/react/createProvider'
import { useTaskFeed } from 'src/store/entities/taskFeed'

type ContextProps = {
  containerRef: React.MutableRefObject<HTMLElement | null>
  isReferenced: boolean
}

type Props = {
  taskFeedId: string
  isPinned?: boolean
}
const useValue = (props: Props): ContextProps => {
  const { getTasksDetailFeedId } = useTasksRouter()
  const { taskFeed } = useTaskFeed(props.taskFeedId)
  const ref = useRef<HTMLElement | null>(null)
  const { taskDetailBodyDom } = useTaskDetailBody()
  const [isReferenced, setIsReferenced] = useState<boolean>(false)

  const setReference = useCallback(() => {
    setIsReferenced(true)
    setTimeout(() => {
      setIsReferenced(false)
    }, 3000)
  }, [])

  const scrollToFeedItem = useCallback(() => {
    const dom = ref.current
    if (!isHTMLElement(dom)) return
    if (!isHTMLElement(taskDetailBodyDom)) return

    setReference()
    const rect = dom.getBoundingClientRect()
    taskDetailBodyDom.scrollTo({ top: rect.top, behavior: 'smooth' })
  }, [setReference, taskDetailBodyDom])

  useEffect(() => {
    const id = getTasksDetailFeedId()
    if (!id) return
    if (props.isPinned) return
    if (id !== taskFeed.id) return

    scrollToFeedItem()
  }, [taskFeed.id, props.isPinned, scrollToFeedItem, getTasksDetailFeedId])

  return {
    containerRef: ref,
    isReferenced,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider/ProviderContainer.tsx'
export const { Provider, useContext: useFeedListItemContainerContext } =
  createProvider(useValue)
