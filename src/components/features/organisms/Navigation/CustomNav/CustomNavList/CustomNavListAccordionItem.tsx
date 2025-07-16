import type { PropsWithChildren } from 'react'
import { AccordionItem } from 'src/components/ui/organisms/Accordion'

export function CustomNavListAccordionItem(props: PropsWithChildren) {
  return <AccordionItem border="none" {...props} />
}
