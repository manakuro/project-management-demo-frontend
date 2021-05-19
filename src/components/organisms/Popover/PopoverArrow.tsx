import React from 'react'
import {
  PopoverArrow as ChakraPopoverArrow,
  PopoverArrowProps as ChakraPopoverArrowProps,
} from '@chakra-ui/react'

type Props = ChakraPopoverArrowProps & {
  ref?: React.MutableRefObject<any>
}
export type PopoverArrowProps = Props

export const PopoverArrow: React.FC<Props> = (props) => {
  return <ChakraPopoverArrow {...props} />
}
