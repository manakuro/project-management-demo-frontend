import React from 'react'
import {
  AccordionIcon as ChakraAccordionIcon,
  IconProps as ChakraAccordionIconProps,
} from '@chakra-ui/react'

type Props = ChakraAccordionIconProps
export type AccordionIconProps = Props

export const AccordionIcon: React.FC<Props> = (props) => {
  return <ChakraAccordionIcon {...props} />
}
