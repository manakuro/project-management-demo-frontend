import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraImageProps
export type ImageProps = Props

export const Image: React.FC<Props> = (props) => {
  return <ChakraImage {...props} />
}