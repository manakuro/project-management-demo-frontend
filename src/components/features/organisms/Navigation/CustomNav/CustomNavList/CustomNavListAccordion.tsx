import type { PropsWithChildren } from 'react'
import { Accordion } from 'src/components/ui/organisms/Accordion'

export function CustomNavListAccordion(props: PropsWithChildren) {
  return <Accordion allowToggle {...props} />
}
