import React from 'react'
import { Grid as ChakraGrid } from '@chakra-ui/react'

type Props = React.ComponentProps<typeof ChakraGrid>

export const Grid: React.FC<Props> = (props) => {
  return (
    <ChakraGrid
      templateColumns="repeat(12, 1fr)"
      gap={5}
      px={5}
      w="full"
      {...props}
    />
  )
}
