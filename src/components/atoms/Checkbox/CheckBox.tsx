import React from 'react'
import {
  Checkbox as ChakraCheckBox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react'

type Props = ChakraCheckboxProps
export type CheckboxProps = Props

export const Checkbox: React.FC<Props> = (props) => {
  return <ChakraCheckBox {...props} />
}
