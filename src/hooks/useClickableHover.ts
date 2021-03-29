import { transitions } from 'src/styles'
import { useMemo } from 'react'
import { ChakraProps } from 'src/shared/chakra'

export const useClickableHover = () => {
  const defaultStyle = useMemo<ChakraProps>(
    () => ({
      _hover: {
        bg: 'gray.50',
      },
      transition: transitions.base,
      cursor: 'pointer',
    }),
    [],
  )
  const lightStyle = useMemo<ChakraProps>(
    () => ({
      opacity: 0.7,
      _hover: {
        opacity: 1,
      },
      transition: transitions.base,
      cursor: 'pointer',
    }),
    [],
  )

  const inputGrabbableStyle = useMemo<ChakraProps>(
    () => ({
      _hover: {
        borderColor: 'gray.300',
        boxShadow: 'lg',
      },
      transition: transitions.base,
      cursor: 'pointer',
    }),
    [],
  )

  return {
    clickableHoverStyle: defaultStyle,
    clickableHoverLightStyle: lightStyle,
    clickableHoverInputGrabbableStyle: inputGrabbableStyle,
  }
}
