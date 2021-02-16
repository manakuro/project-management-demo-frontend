import React from 'react'
import {
  AspectRatio as ChakraAspectRatio,
  AspectRatioProps,
} from '@chakra-ui/react'

type Props = AspectRatioProps

export const AspectRatio: React.FC<Props> = (props) => {
  return <ChakraAspectRatio {...props} />
}
