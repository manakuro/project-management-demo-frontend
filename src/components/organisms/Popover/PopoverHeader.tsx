import React from 'react'
import {
  PopoverHeader as ChakraPopoverHeader,
  PopoverHeaderProps as ChakraPopoverHeaderProps,
} from '@chakra-ui/react'

type Props = ChakraPopoverHeaderProps
export type PopoverHeaderProps = Props

export const PopoverHeader: React.FC<Props> = (props) => {
  return <ChakraPopoverHeader {...props} />
}
