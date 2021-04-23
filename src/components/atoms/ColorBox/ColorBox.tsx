import React from 'react'
import { forwardRef } from 'src/shared/chakra'
import { Box, BoxProps } from 'src/components/atoms'

type Props = BoxProps & {
  ref?: React.ForwardedRef<any>
  color: BoxProps['bgColor']
  size: Sizes
}
export type ColorBoxProps = Props

const sizes = {
  lg: {
    w: 5,
    h: 5,
  },
  md: {
    w: 4,
    h: 4,
  },
  sm: {
    w: 3,
    h: 3,
  },
  xs: {
    w: 2,
    h: 2,
  },
} as const
type Sizes = keyof typeof sizes

export const ColorBox: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => {
    const { size, color, ...rest } = props
    const sizeStyle = sizes[size ?? 'md']

    return (
      <Box {...sizeStyle} borderRadius="sm" bg={color} {...rest} ref={ref} />
    )
  },
)
