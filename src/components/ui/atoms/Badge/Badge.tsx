import {
  Badge as ChakraBadge,
  type BadgeProps as ChakraBadgeProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraBadgeProps
export type BadgeProps = Props

export const Badge: React.FC<Props> = (props) => {
  return (
    <ChakraBadge
      px={3}
      textTransform="none"
      borderRadius="full"
      style={{
        display: 'inline-block',
      }}
      {...props}
    />
  )
}
