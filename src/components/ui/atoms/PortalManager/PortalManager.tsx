import {
  PortalManager as ChakraPortalManager,
  type PortalManagerProps as ChakraPortalManagerProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraPortalManagerProps & {
  ref?: React.MutableRefObject<any>
}
export type PortalManagerProps = ChakraPortalManagerProps

export const PortalManager: React.FC<Props> = (props) => {
  return <ChakraPortalManager {...props} />
}
