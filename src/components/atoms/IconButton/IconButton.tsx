import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
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
  const { selectedStyle, ...linkHoverStyle } = useLinkHoverStyle()
  const style = useMemo(
    (): ChakraProps => ({
      ...(props.variant === 'ghost' ? { p: '0.4em' } : {}),
      ...(light ? linkHoverStyle : {}),
    }),
    [light, linkHoverStyle, props.variant],
  )

  return (
    <ChakraIconButton
      as="div"
      cursor="pointer"
      minW={8}
      h={8}
      borderRadius="md"
      {...style}
      {...rest}
      ref={ref}
    />
  )
})
IconButton.id = 'IconButton'
