import { useMemo } from 'react'
import { ChakraProps } from 'src/shared/chakra'

type Props = ChakraProps

export const useLinkStyle = (props?: Props) => {
  const style = useMemo<ChakraProps>(
    () => ({
      color: 'cyan.400',
      cursor: 'pointer',
      fontSize: 'sm',
      _hover: {
        textDecoration: 'underline !important',
      },
      ...props,
    }),
    [props],
  )

  return {
    style,
  }
}
