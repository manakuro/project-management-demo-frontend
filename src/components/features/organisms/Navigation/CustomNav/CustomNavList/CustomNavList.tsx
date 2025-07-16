import type { PropsWithChildren } from 'react';
import { Flex } from 'src/components/ui/atoms';

export function CustomNavList(props: PropsWithChildren) {
  return <Flex flexDirection="column" {...props} />;
}
