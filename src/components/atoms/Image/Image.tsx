import React from 'react'
import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from '@chakra-ui/react'

type Props = ChakraImageProps
export type ImageProps = Props

export const Image: React.FC<Props> = (props) => {
  return <ChakraImage {...props} />
}
