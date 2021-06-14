import {
  Slide as ChakraSlide,
  SlideProps as ChakraSlideProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraSlideProps
export type SlideProps = Props

export const Slide: React.FC<Props> = (props) => {
  return <ChakraSlide {...props} />
}
