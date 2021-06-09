import {
  PopoverBody as ChakraPopoverBody,
  PopoverBodyProps as ChakraPopoverBodyProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraPopoverBodyProps & {
  ref?: React.MutableRefObject<any>
}
export type PopoverBodyProps = Props

export const PopoverBody: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraPopoverBody {...props} ref={ref} />
))
