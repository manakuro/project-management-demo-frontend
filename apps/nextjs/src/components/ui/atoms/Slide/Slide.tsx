import { forwardRef } from '@/shared/chakra';
import {
  Slide as ChakraSlide,
  type SlideProps as ChakraSlideProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraSlideProps & {
  ref?: React.ForwardedRef<any>;
};
export type SlideProps = Props;

export const Slide: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraSlide {...props} ref={ref} />
));
