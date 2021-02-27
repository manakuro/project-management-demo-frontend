import React from 'react'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraLinkProps
export type LinkProps = ChakraLinkProps

export const Link: React.FC<Props> = forwardRef<ChakraLinkProps, 'a'>(
  (props, ref) => {
    return <ChakraLink {...props} ref={ref} />
  },
)
