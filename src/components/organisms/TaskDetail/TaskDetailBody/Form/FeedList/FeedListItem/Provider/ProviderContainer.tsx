import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'
import { getTaskDetailFeedId, useRouter } from 'src/router'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { useFeed } from 'src/store/entities/feeds'

type ContextProps = {
  containerRef: React.MutableRefObject<HTMLElement | null>
  isReferenced: boolean
}

const Context = createContext<ContextProps>({
  containerRef: null as any,
  isReferenced: false,
})
export const useFeedListItemContainer = () => useContext(Context)

type Props = {
  feedId: string
  isPinned?: boolean
}
export const Provider: React.FC<Props> = (props) => {
  const { feed } = useFeed(props.feedId)
  const ref = useRef<HTMLElement | null>(null)
  const { router } = useRouter()
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
    const id = getTaskDetailFeedId(router)
    if (!id) return
    if (props.isPinned) return
    if (id !== feed.id) return

    scrollToFeedItem()
  }, [feed.id, props.isPinned, router, scrollToFeedItem])

  return (
    <Context.Provider
      value={{
        containerRef: ref,
        isReferenced,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
