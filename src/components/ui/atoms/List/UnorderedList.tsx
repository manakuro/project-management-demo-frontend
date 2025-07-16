import {
  type ListProps as ChakraListProps,
  UnorderedList as ChakraUnorderedList,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraListProps;
export type UnorderedListProps = Props;

export const UnorderedList: React.FC<Props> = (props) => {
  return <ChakraUnorderedList {...props} />;
};
