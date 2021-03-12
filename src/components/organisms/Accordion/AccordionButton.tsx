import React from 'react'
import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
} from '@chakra-ui/react'

type Props = ChakraAccordionButtonProps
export type AccordionButtonProps = Props

export const AccordionButton: React.FC<Props> = (props) => {
  return <ChakraAccordionButton {...props} />
}
