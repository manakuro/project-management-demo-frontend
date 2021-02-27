import React from 'react'
import {
  Grid as ChakraGrid,
  GridProps as ChakraGridProps,
} from '@chakra-ui/react'

type Props = ChakraGridProps
export type GridProps = Props

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
