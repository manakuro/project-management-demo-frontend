import React from 'react'
import {
  Skeleton as ChakraSkeleton,
  SkeletonProps as ChakraSkeletonProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraSkeletonProps & {
  ref?: React.ForwardedRef<any>
}
export type SkeletonProps = Props

export const Skeleton: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => (
    <ChakraSkeleton
      startColor="gray.100"
      endColor="gray.300"
      {...props}
      ref={ref}
    />
  ),
)
