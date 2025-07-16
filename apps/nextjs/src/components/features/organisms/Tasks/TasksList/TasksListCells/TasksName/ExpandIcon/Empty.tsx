import type React from 'react';
import { memo } from 'react';
import { Flex } from 'src/components/ui/atoms';

export const Empty: React.FC = memo(() => {
  return <Flex h={5} minW={5} p={0} />;
});
Empty.displayName = 'Empty';
