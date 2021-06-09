import { useMemo } from 'react'
import { ChakraProps, Colors } from 'src/shared/chakra'
import { transitions } from 'src/styles'

export type UseHoverProps = {
  light?: boolean
  color?: Colors
}

export const useLinkHoverStyle = (
  props?: UseHoverProps,
): ChakraProps & { selected: { bg: 'navigation.selected' } } => {
  const bg =
    props?.color ||
    (props?.light ? 'navigation.hover.light' : 'navigation.hover.dark')

  return useMemo(
    () => ({
      _hover: {
        bg,
      },
      selected: { bg: 'navigation.selected' },
      _active: { bg: 'navigation.selected' },
      transition: transitions.base(),
    }),
    [bg],
  )
}
