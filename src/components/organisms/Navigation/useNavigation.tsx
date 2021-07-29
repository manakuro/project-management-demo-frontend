import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Navigation/useNavigation/${str}`

const state = atom({
  key: key('navigationState'),
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
