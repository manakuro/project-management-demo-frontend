import {
  GridItem as ChakraGridItem,
  type GridItemProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = GridItemProps;

export const GridItem: React.FC<Props> = (props) => {
  return <ChakraGridItem {...props} />;
};
