import {
  ModalContent as ChakraModalContent,
  type ModalContentProps as ChakraModalContentProps,
} from '@chakra-ui/react'
import type React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraModalContentProps & {
  ref?: React.ForwardedRef<any>
}
export type ModalContentProps = Props

export const ModalContent: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraModalContent ref={ref} {...props} aria-label="modal-content" />
))
