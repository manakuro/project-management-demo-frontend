import { useMemo } from 'react'

export type UseHoverProps = {
  light?: boolean
}

export const useLinkHover = (props?: UseHoverProps) => {
  const bg = props?.light ? 'navigation.hover.light' : 'navigation.hover.dark'

  return useMemo(
    () => ({
      _hover: {
        bg,
      },
      selected: { bg: 'navigation.selected' },
    }),
    [bg],
  )
}
