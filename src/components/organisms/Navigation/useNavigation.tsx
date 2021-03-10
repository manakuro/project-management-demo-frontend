import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const state = atom({
  key: 'navigationState',
  default: true,
})

export const useNavigation = () => {
  const [isExpanded, setIsExpanded] = useRecoilState(state)

  const toggleMenu = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [setIsExpanded])

  return {
    isExpanded,
    toggleMenu,
  }
}
