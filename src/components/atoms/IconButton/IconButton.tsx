import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'
import React from 'react'
import { useLinkHoverStyle } from 'src/hooks'
import { ChakraProps, forwardRef } from 'src/shared/chakra'

type Props = ChakraIconButtonProps & {
  light?: boolean
  ref?: React.ForwardedRef<any>
}
export type IconButtonProps = Props

export const IconButton: React.FC<Props> & { id?: string } = forwardRef<
  Props,
  'button'
>((props, ref) => {
  const { light, ...rest } = props
  const linkHoverStyle = useLinkHoverStyle()

  let style: ChakraProps
  switch (true) {
    case props.variant === 'ghost':
      style = {
        p: '0.4em',
      }
      break
    default:
      style = {}
  }
  if (light) {
    style = {
      ...style,
      ...linkHoverStyle,
    }
  }

  return (
    <ChakraIconButton
      as="div"
      cursor="pointer"
      minW={8}
      h={8}
      {...style}
      {...rest}
      ref={ref}
    />
  )
})
IconButton.id = 'IconButton'
