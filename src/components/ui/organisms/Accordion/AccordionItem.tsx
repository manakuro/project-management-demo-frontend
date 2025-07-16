import {
  AccordionItem as ChakraAccordionItem,
  type AccordionItemProps as ChakraAccordionItemProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraAccordionItemProps
export type AccordionItemProps = Props

export const AccordionItem: React.FC<Props> = (props) => {
  return <ChakraAccordionItem {...props} />
}
