import React from 'react'
import { AccordionButton } from 'src/components/organisms/Accordion'
import { PADDING_X } from '../../Navigation'

type Props = {}

export const CustomNavListAccordionButton: React.FCWithChildren<Props> = (
  props,
) => {
  return <AccordionButton px={PADDING_X} py={4} {...props} />
}
