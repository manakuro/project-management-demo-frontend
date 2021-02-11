import React from 'react'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { forwardRef } from '@chakra-ui/system'

type Props = LinkProps

export const Link: React.FC<Props> = forwardRef<LinkProps, 'a'>(
  (props, ref) => {
    return <ChakraLink {...props} ref={ref} />
  },
)
