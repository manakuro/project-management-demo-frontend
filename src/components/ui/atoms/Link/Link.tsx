import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import type React from 'react'
import { useMemo } from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraLinkProps & {
  hover?: boolean
}
export type LinkProps = ChakraLinkProps

export const Link: React.FC<Props> = forwardRef<Props, 'a'>((props, ref) => {
  const { hover, ...rest } = props

  const style = useMemo(
    () => ({
      ...(hover ? { _hover: { color: 'cyan.400' } } : {}),
    }),
    [hover],
  )

  return <ChakraLink {...style} {...rest} ref={ref} />
})
