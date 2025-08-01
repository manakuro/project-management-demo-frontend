import { AccordionItem } from '@/components/ui/organisms/Accordion';
import type { PropsWithChildren } from 'react';

export function CustomNavListAccordionItem(props: PropsWithChildren) {
  return <AccordionItem border="none" {...props} />;
}
