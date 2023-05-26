import {
  UnorderedList as ChakraUnorderedList,
  ListProps as ChakraListProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraListProps
export type UnorderedListProps = Props

export const UnorderedList: React.FC<Props> = (props) => {
  return <ChakraUnorderedList {...props} />
}
