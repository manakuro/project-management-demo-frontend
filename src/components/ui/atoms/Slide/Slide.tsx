import {
  Slide as ChakraSlide,
  SlideProps as ChakraSlideProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraSlideProps & {
  ref?: React.ForwardedRef<any>
}
export type SlideProps = Props

export const Slide: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraSlide {...props} ref={ref} />
))
