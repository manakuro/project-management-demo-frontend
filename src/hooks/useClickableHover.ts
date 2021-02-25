import { transitions } from 'src/styles'
import { useMemo } from 'react'

export const useClickableHover = () => {
  return useMemo(
    () => ({
      opacity: 0.7,
      _hover: {
        opacity: 1,
      },
      transition: transitions.base,
    }),
    [],
  )
}
