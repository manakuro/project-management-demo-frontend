import { useMemo } from 'react'
import { transitions } from 'src/styles'
import { Colors } from 'src/shared/chakra'

export type UseHoverProps = {
  light?: boolean
  color?: Colors
}

export const useLinkHoverStyle = (props?: UseHoverProps) => {
  const bg =
    props?.color ||
    (props?.light ? 'navigation.hover.light' : 'navigation.hover.dark')

  return useMemo(
    () => ({
      _hover: {
        bg,
      },
      selected: { bg: 'navigation.selected' },
      transition: transitions.base,
    }),
    [bg],
  )
}
