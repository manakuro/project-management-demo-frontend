import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraListItemProps
export type ListItemProps = ChakraListItemProps

export const ListItem: React.FC<Props> = (props) => {
  return <ChakraListItem {...props} />
}
