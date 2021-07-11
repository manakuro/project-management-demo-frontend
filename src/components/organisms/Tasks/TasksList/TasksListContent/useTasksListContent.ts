import { useCallback, useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'
import { isHTMLElement } from 'src/shared/isHTMLElement'

const taskListContentState = atom<HTMLElement | null>({
  key: 'taskListContentState',
  default: null,
})
const taskListContentScrollState = atom<boolean>({
  key: 'taskListContentScrollState',
  default: false,
})

type Props = {
  listenOnScroll?: boolean
}
export const useTasksListContent = (props?: Props) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(taskListContentState)
  const [isScrolling, setIsScrolling] = useRecoilState(
    taskListContentScrollState,
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
    if (!props?.listenOnScroll) return
    if (!ref.current) return
    const dom = ref.current

    dom.addEventListener('scroll', handleScroll)

    return () => dom.removeEventListener('scroll', handleScroll)
  }, [handleScroll, props?.listenOnScroll])

  return {
    ref,
    dom: state,
    isScrolling,
  }
}
