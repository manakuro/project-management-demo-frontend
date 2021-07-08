import { useMemo } from 'react'
import { useNavigation } from 'src/components/organisms'

export const useMainStyle = () => {
  const { isExpanded } = useNavigation()

  const maxW = useMemo(
    () => (isExpanded ? 'calc(100vw - 240px)' : 'calc(100vw - 53px)'),
    [isExpanded],
  )

  return {
    paddingX: 6,
    maxW,
  }
}
