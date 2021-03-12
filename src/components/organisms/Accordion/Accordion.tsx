import React from 'react'
import {
  Accordion as ChakraAccordion,
  AccordionProps as ChakraAccordionProps,
} from '@chakra-ui/react'

type Props = ChakraAccordionProps
export type AccordionProps = Props

export const Accordion: React.FC<Props> = (props) => {
  return <ChakraAccordion {...props} />
}
