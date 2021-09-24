import React from 'react'
import { AccordionPanel } from 'src/components/organisms/Accordion'

type Props = {}

export const CustomNavListAccordionPanel: React.FC<Props> = (props) => {
  return <AccordionPanel p={0} {...props} />
}