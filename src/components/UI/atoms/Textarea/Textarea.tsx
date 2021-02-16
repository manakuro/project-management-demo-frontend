import React from 'react'
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'

type Props = ChakraTextareaProps
export type TextareaProps = Props

export const Textarea: React.FC<Props> = (props) => {
  return <ChakraTextarea {...props} />
}
