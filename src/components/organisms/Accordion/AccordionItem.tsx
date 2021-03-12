import React from 'react'
import {
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
} from '@chakra-ui/react'

type Props = ChakraAccordionItemProps
export type AccordionItemProps = Props

export const AccordionItem: React.FC<Props> = (props) => {
  return <ChakraAccordionItem {...props} />
}
