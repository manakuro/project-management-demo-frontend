import React from 'react'
import {
  UnorderedList as ChakraUnorderedList,
  ListProps as ChakraListProps,
} from '@chakra-ui/react'

type Props = ChakraListProps
export type UnorderedListProps = Props

export const UnorderedList: React.FC<Props> = (props) => {
  return <ChakraUnorderedList {...props} />
}
