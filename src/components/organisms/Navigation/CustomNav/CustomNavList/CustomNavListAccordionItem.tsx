import React from 'react'
import { AccordionItem } from 'src/components/organisms/Accordion'

type Props = {}

export const CustomNavListAccordionItem: React.FC<Props> = (props) => {
  return <AccordionItem border="none" {...props} />
}
