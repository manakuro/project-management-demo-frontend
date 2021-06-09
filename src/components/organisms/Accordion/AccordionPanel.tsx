import {
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps as ChakraAccordionPanelProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraAccordionPanelProps
export type AccordionPanelProps = Props

export const AccordionPanel: React.FC<Props> = (props) => {
  return <ChakraAccordionPanel {...props} />
}
