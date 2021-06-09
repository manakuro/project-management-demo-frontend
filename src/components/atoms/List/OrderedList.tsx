import {
  OrderedList as ChakraOrderedList,
  ListProps as ChakraListProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraListProps & {
  start?: number
}
export type OrderedListProps = Props

export const OrderedList: React.FC<Props> = (props) => {
  return <ChakraOrderedList {...props} />
}
