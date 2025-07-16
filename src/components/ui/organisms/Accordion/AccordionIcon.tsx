import {
  AccordionIcon as ChakraAccordionIcon,
  type IconProps as ChakraAccordionIconProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraAccordionIconProps
export type AccordionIconProps = Props

export const AccordionIcon: React.FC<Props> = (props) => {
  return <ChakraAccordionIcon {...props} />
}
