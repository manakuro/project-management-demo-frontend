import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { useInboxListContentRef } from './useInboxListContentRef'

const key = (str: string) =>
  `src/components/organisms/Inbox/InboxListContent/useInboxListContentVerticalScroll/${str}`

const state = atom<boolean>({
  key: key('state'),
  default: false,
})

type Props = {
  listenOnEvent?: boolean
}
export const useInboxListContentVerticalScroll = (props?: Props) => {
  const { element } = useInboxListContentRef()
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
    if (!element) return

    element.addEventListener('scroll', handleScroll)

    return () => element.removeEventListener('scroll', handleScroll)
  }, [handleScroll, props?.listenOnEvent, element])

  return {
    isScrolling,
  }
}
