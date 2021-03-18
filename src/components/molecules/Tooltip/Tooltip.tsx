import React from 'react'
import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTooltipProps & {
  withIcon?: boolean
  size?: Sizes
}
export type TooltipProps = Props

const sizes = {
  md: {
    w: '200px',
  },
  sm: {
    w: '120px',
  },
} as const
type Sizes = keyof typeof sizes

export const Tooltip: React.FC<Props> & { id?: string } = forwardRef<
  Props,
  'div'
>((props, ref) => {
  const { size, withIcon, ...rest } = props
  const sizeStyle = sizes[(size as Sizes) ?? 'md']
  const tooltipProps: ChakraTooltipProps = {
    py: 2,
    px: 4,
    borderRadius: 'md',
    textAlign: 'center',
    ...sizeStyle,
    ...rest,
  }

  if (props.withIcon) {
    // NOTE: Need to wrap Icon with span
    // @see https://github.com/chakra-ui/chakra-ui/issues/2869
    return (
      <ChakraTooltip {...tooltipProps} ref={ref}>
        <span>{props.children}</span>
      </ChakraTooltip>
    )
  }

  return <ChakraTooltip {...tooltipProps} ref={ref} />
})

Tooltip.id = 'Tooltip'
