import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';

type Props = FlexProps;

export const SearchMenuLeftContainer: React.FC<Props> = memo<Props>((props) => {
  return <Flex alignItems="center" justifyContent="center" w={8} {...props} />;
});
SearchMenuLeftContainer.displayName = 'SearchMenuLeftContainer';
