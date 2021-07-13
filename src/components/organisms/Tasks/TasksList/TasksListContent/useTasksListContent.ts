import { useCallback, useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useResizeObserver } from 'src/hooks/useResizeObserver'
import { isHTMLElement } from 'src/shared/isHTMLElement'

const taskListContentState = atom<HTMLElement | null>({
  key: 'taskListContentState',
  default: null,
})
const taskListContentScrollState = atom<boolean>({
  key: 'taskListContentScrollState',
  default: false,
})
const taskListContentStickyVerticalState = atom<boolean>({
  key: 'taskListContentStickyVerticalState',
  default: false,
})

type Props = {
  listenOnEvent?: boolean
}
export const useTasksListContent = (props?: Props) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(taskListContentState)
  const [isScrolling, setIsScrolling] = useRecoilState(
    taskListContentScrollState,
  )
  const [isStickyVertical, setIsStickyVertical] = useRecoilState(
    taskListContentStickyVerticalState,
  )

  useEffect(() => {
    if (ref.current) {
      setState(ref.current)
    }

    return () => {
      setState(null)
    }
  }, [setState])

  const handleScroll = useCallback(
    (event: Event) => {
      if (!isHTMLElement(event.target)) return
      setIsScrolling(event.target.scrollTop > 0)
    },
    [setIsScrolling],
  )

  useEffect(() => {
    if (!props?.listenOnEvent) return
    if (!ref.current) return
    const dom = ref.current

    dom.addEventListener('scroll', handleScroll)

    return () => dom.removeEventListener('scroll', handleScroll)
  }, [handleScroll, props?.listenOnEvent])

  useResizeObserver(
    (ref.current?.children?.[0] ?? null) as HTMLElement | null,
    (entry) => {
      const current = ref.current!
      const listContainerWidth = current.getBoundingClientRect().width
      const listContentWidth = entry.contentRect.width
      setIsStickyVertical(listContentWidth > listContainerWidth)
    },
    {
      skip: !props?.listenOnEvent,
    },
  )

  return {
    ref,
    dom: state,
    isScrolling,
    isStickyVertical,
  }
}
