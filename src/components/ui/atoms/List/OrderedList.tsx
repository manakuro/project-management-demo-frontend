import {
  type ListProps as ChakraListProps,
  OrderedList as ChakraOrderedList,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraListProps & {
  start?: number
}
export type OrderedListProps = Props

export const OrderedList: React.FC<Props> = (props) => {
  return <ChakraOrderedList {...props} />
}
