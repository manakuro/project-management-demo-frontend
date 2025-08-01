import { AccordionPanel } from '@/components/ui/organisms/Accordion';
import type { PropsWithChildren } from 'react';

export function CustomNavListAccordionPanel(props: PropsWithChildren) {
  return <AccordionPanel p={0} {...props} />;
}
