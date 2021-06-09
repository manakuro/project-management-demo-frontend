import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraBadgeProps
export type BadgeProps = Props

export const Badge: React.FC<Props> = (props) => {
  return (
    <ChakraBadge px={3} textTransform="none" borderRadius="full" {...props} />
  )
}
