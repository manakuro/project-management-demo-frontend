import { forwardRef } from '@/shared/chakra';
import {
  Skeleton as ChakraSkeleton,
  type SkeletonProps as ChakraSkeletonProps,
} from '@chakra-ui/react';
import type React from 'react';

type Props = ChakraSkeletonProps & {
  ref?: React.ForwardedRef<any>;
};
export type SkeletonProps = Props;

export const Skeleton: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => (
    <ChakraSkeleton
      startColor="gray.100"
      endColor="gray.300"
      {...props}
      ref={ref}
    />
  ),
);
