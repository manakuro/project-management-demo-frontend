import React from 'react'
import { GridItem as ChakraGridItem, GridItemProps } from '@chakra-ui/react'

type Props = GridItemProps

export const GridItem: React.FC<Props> = (props) => {
  return <ChakraGridItem {...props} />
}
