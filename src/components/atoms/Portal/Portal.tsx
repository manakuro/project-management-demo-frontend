import React from 'react'
import {
  Portal as ChakraPortal,
  PortalProps as ChakraPortalProps,
} from '@chakra-ui/react'

type Props = ChakraPortalProps
export type PortalProps = ChakraPortalProps

export const Portal: React.FC<Props> = (props) => {
  return <ChakraPortal {...props} />
}
