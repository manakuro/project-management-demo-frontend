import {
  AccordionPanel as ChakraAccordionPanel,
  type AccordionPanelProps as ChakraAccordionPanelProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraAccordionPanelProps
export type AccordionPanelProps = Props

export const AccordionPanel: React.FC<Props> = (props) => {
  return <ChakraAccordionPanel {...props} />
}
