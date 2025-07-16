import {
  PopoverCloseButton as ChakraPopoverCloseButton,
  type PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraPopoverCloseButtonProps
export type PopoverCloseButtonProps = Props

export const PopoverCloseButton: React.FC<Props> = (props) => {
  return <ChakraPopoverCloseButton {...props} />
}
