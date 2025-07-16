import type { PropsWithChildren } from 'react'
import { AccordionPanel } from 'src/components/ui/organisms/Accordion'

export function CustomNavListAccordionPanel(props: PropsWithChildren) {
  return <AccordionPanel p={0} {...props} />
}
