import {
  type AspectRatioProps,
  AspectRatio as ChakraAspectRatio,
} from '@chakra-ui/react'
import type React from 'react'

type Props = AspectRatioProps

export const AspectRatio: React.FC<Props> = (props) => {
  return <ChakraAspectRatio {...props} />
}
