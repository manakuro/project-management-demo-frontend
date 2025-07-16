import {
  ModalBody as ChakraModalBody,
  type ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react'
import type React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraModalBodyProps & {
  ref?: React.ForwardedRef<any>
}
export type ModalBodyProps = Props

export const ModalBody: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraModalBody {...props} ref={ref} />
))
