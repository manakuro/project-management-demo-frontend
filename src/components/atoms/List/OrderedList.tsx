import React from 'react'
import {
  OrderedList as ChakraOrderedList,
  ListProps as ChakraListProps,
} from '@chakra-ui/react'

type Props = ChakraListProps & {
  start?: number
}
export type OrderedListProps = Props

export const OrderedList: React.FC<Props> = (props) => {
  return <ChakraOrderedList {...props} />
}
