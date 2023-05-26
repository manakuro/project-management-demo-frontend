import {
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraModalBodyProps & {
  ref?: React.ForwardedRef<any>
}
export type ModalBodyProps = Props

export const ModalBody: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraModalBody {...props} ref={ref} />
))
