import { Box as ChakraBox, BoxProps } from '@chakra-ui/react'
import React from 'react'

type Props = BoxProps & {
  mobile?: boolean
  pc?: boolean
}

export const Media: React.FC<Props> = ({ pc, mobile, ...rest }) => {
  switch (true) {
    case Boolean(mobile):
      return <ChakraBox display={{ base: 'block', sm: 'none' }} {...rest} />
    case Boolean(pc):
      return <ChakraBox display={{ base: 'none', md: 'block' }} {...rest} />
    default:
      return <>{rest.children}</>
  }
}
