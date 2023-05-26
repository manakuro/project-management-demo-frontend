import {
  Grid as ChakraGrid,
  GridProps as ChakraGridProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraGridProps
export type GridProps = Props

export const Grid: React.FC<Props> = (props) => {
  return <ChakraGrid {...props} />
}
