import { GridItem as ChakraGridItem, GridItemProps } from '@chakra-ui/react'
import React from 'react'

type Props = GridItemProps

export const GridItem: React.FC<Props> = (props) => {
  return <ChakraGridItem {...props} />
}
