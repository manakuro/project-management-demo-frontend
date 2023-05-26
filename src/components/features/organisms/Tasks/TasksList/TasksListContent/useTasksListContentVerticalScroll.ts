import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { useTasksListContent } from './useTasksListContent'

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksList/TasksListContent/useTasksListContentScroll/${str}`

const state = atom<boolean>({
  key: key('state'),
  default: false,
})

type Props = {
  listenOnEvent?: boolean
}
export const useTasksListContentVerticalScroll = (props?: Props) => {
  const { dom } = useTasksListContent()
  const [isScrolling, setIsScrolling] = useRecoilState(state)

  const handleScroll = useCallback(
    (event: Event) => {
      if (!isHTMLElement(event.target)) return
      setIsScrolling(event.target.scrollTop > 0)
    },
    [setIsScrolling],
  )

  useEffect(() => {
    if (!props?.listenOnEvent) return
    if (!dom) return

    dom.addEventListener('scroll', handleScroll)

    return () => dom.removeEventListener('scroll', handleScroll)
  }, [handleScroll, props?.listenOnEvent, dom])

  return {
    isScrolling,
  }
}
