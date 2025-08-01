import { Text, type TextProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = TextProps;
export type MoreLinkProps = Props;

export const MoreLink: React.FC<Props> = (props) => {
  return (
    <Text
      as="span"
      fontSize="xs"
      color="link"
      cursor="pointer"
      _hover={{
        textDecoration: 'underline !important',
      }}
      {...props}
    />
  );
};
