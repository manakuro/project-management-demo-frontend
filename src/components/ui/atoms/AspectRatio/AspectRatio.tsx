import {
  AspectRatio as ChakraAspectRatio,
  AspectRatioProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = AspectRatioProps

export const AspectRatio: React.FC<Props> = (props) => {
  return <ChakraAspectRatio {...props} />
}
