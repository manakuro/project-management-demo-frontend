import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useLinkHoverStyle } from 'src/hooks'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraButtonProps & {
  ref?: React.ForwardedRef<any>
  lightBg?: boolean
}
export type ButtonProps = Props

export const Button: React.FC<Props> & {
  id?: string
} = forwardRef((props, ref) => {
  const { lightBg, ...rest } = props
  const { selectedStyle, ...linkHoverStyle } = useLinkHoverStyle()
  const style = useMemo(
    () => ({
      ...(lightBg ? linkHoverStyle : {}),
    }),
    [lightBg, linkHoverStyle],
  )

  return (
    <ChakraButton
      minH={7}
      iconSpacing={1}
      fontWeight="normal"
      outline="none; !important"
      {...style}
      {...rest}
      ref={ref}
    />
  )
})

Button.id = 'Button'
