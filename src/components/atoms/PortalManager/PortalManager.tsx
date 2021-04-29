import React from 'react'
import {
  PortalManager as ChakraPortalManager,
  PortalManagerProps as ChakraPortalManagerProps,
} from '@chakra-ui/react'

type Props = ChakraPortalManagerProps & {
  ref?: React.MutableRefObject<any>
}
export type PortalManagerProps = ChakraPortalManagerProps

export const PortalManager: React.FC<Props> = (props) => {
  return <ChakraPortalManager {...props} />
}
