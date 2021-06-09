import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraTextareaProps
export type TextareaProps = Props

export const Textarea: React.FC<Props> = (props) => {
  return <ChakraTextarea {...props} />
}
