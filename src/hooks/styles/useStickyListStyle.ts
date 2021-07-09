import { useMemo } from 'react'
import { ChakraProps } from 'src/shared/chakra'

export const useStickyListStyle = () => {
  const stickyStyle = useMemo(
    (): ChakraProps => ({
      position: 'sticky',
      left: 0,
      zIndex: 100,
      bg: 'white',
    }),
    [],
  )

  return {
    stickyStyle,
  }
}
