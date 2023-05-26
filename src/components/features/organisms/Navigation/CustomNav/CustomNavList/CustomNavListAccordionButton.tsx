import React from 'react'
import {
  AccordionButton,
  AccordionButtonProps,
} from 'src/components/ui/organisms/Accordion'
import { PADDING_X } from '../../Navigation'

type Props = AccordionButtonProps

export const CustomNavListAccordionButton: React.FCWithChildren<Props> = (
  props,
) => {
  return <AccordionButton px={PADDING_X} py={4} {...props} />
}
