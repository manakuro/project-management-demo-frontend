import { List as ChakraList } from '@chakra-ui/react'
import React from 'react'

type Props = React.ComponentProps<typeof ChakraList>

export const List: React.FC<Props> = (props) => {
  return <ChakraList {...props} />
}
