import React from 'react'
import {
  PopoverCloseButton as ChakraPopoverCloseButton,
  PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
} from '@chakra-ui/react'

type Props = ChakraPopoverCloseButtonProps
export type PopoverCloseButtonProps = Props

export const PopoverCloseButton: React.FC<Props> = (props) => {
  return <ChakraPopoverCloseButton {...props} />
}
