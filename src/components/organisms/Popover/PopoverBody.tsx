import React from 'react'
import {
  PopoverBody as ChakraPopoverBody,
  PopoverBodyProps as ChakraPopoverBodyProps,
} from '@chakra-ui/react'

type Props = ChakraPopoverBodyProps
export type PopoverBodyProps = Props

export const PopoverBody: React.FC<Props> = (props) => {
  return <ChakraPopoverBody {...props} />
}
