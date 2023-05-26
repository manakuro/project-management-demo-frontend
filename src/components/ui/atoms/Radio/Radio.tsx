import {
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraRadioProps
export type RadioProps = Props

export const Radio: React.FC<Props> = (props) => {
  return <ChakraRadio {...props} />
}
