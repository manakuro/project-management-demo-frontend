import React from 'react'
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react'
import { IconType, icons } from 'src/shared/icons'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraIconProps & {
  icon: IconType
  size?: Sizes
}
export type IconProps = Props

const sizes = {
  '3xl': {
    w: 10,
    h: 10,
  },
  md: {
    w: '1.25em',
    h: '1.25em',
  },
  sm: {
    w: '1.15em',
    h: '1.15em',
  },
  xs: {
    w: '1em',
    h: '1em',
  },
} as const
type Sizes = keyof typeof sizes

export const Icon: React.FC<Props> & { id?: string } = forwardRef<Props, 'svg'>(
  (props, ref) => {
    const { size, icon, ...iconProps } = props
    const iconComponent = icons[icon]
    const sizeStyle = sizes[size ?? 'md']

    return (
      <ChakraIcon
        ref={ref}
        as={iconComponent}
        color="whiteAlpha"
        {...sizeStyle}
        {...iconProps}
      />
    )
  },
)

Icon.id = 'Icon'
