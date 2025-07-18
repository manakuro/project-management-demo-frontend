import {
  Slide as ChakraSlide,
  type SlideProps as ChakraSlideProps,
} from '@chakra-ui/react';
import type React from 'react';
import { forwardRef } from 'src/shared/chakra';

type Props = ChakraSlideProps & {
  ref?: React.ForwardedRef<any>;
};
export type SlideProps = Props;

export const Slide: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraSlide {...props} ref={ref} />
));
