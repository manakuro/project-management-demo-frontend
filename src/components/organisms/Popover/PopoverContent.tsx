import React from 'react'
import {
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
} from '@chakra-ui/react'

type Props = ChakraPopoverContentProps
export type PopoverContentProps = Props

export const PopoverContent: React.FC<Props> = (props) => {
  return <ChakraPopoverContent {...props} />
}
