import React from 'react'
import { ListItem as ChakraListItem } from '@chakra-ui/react'

type Props = React.ComponentProps<typeof ChakraListItem>

export const ListItem: React.FC<Props> = (props) => {
  return <ChakraListItem {...props} />
}
