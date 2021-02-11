import React from 'react'
import NextImage, { ImageProps } from 'next/image'
// import { Fade } from '@chakra-ui/transition'

type Props = ImageProps

export const Image: React.FC<Props> = (props) => {
  return <NextImage {...props} />
}
