import {
  MenuButton as ChakraMenuButton,
  type MenuButtonProps as ChakraMenuButtonProps,
} from '@chakra-ui/react'
import type React from 'react'
import { useMemo } from 'react'
import { Box } from 'src/components/ui/atoms'
import type { ChakraProps } from 'src/shared/chakra'

type Props = ChakraMenuButtonProps &
  React.ComponentProps<typeof ChakraMenuButton> & {
    spanStyle?: ChakraProps
  }
export type MenuButtonProps = Props

export const MenuButton: React.FC<Props> = (props) => {
  const { spanStyle, ...rest } = props
  const style = useMemo(
    () => ({
      ...(spanStyle ? { sx: { '> span': spanStyle } } : {}),
    }),
    [spanStyle],
  )

  return (
    <ChakraMenuButton
      as={Box}
      outline="none; !important"
      {...style}
      {...rest}
    />
  )
}
