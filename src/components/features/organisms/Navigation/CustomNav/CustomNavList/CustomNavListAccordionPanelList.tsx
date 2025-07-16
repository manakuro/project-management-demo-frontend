import type { PropsWithChildren } from 'react';
import { List } from 'src/components/ui/atoms';

export function CustomNavListAccordionPanelList(props: PropsWithChildren) {
  return <List mb={2} {...props} />;
}
