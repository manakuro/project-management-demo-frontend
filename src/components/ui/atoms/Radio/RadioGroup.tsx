import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraRadioGroupProps
export type RadioGroupProps = Props

export const RadioGroup: React.FC<Props> = (props) => {
  return <ChakraRadioGroup {...props} />
}
