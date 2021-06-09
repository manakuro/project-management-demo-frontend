import {
  AvatarBadge as ChakraAvatarBadge,
  AvatarBadgeProps as ChakraAvatarBadgeProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraAvatarBadgeProps
export type AvatarBadgeProps = Props

export const AvatarBadge: React.FC<Props> = (props) => {
  return <ChakraAvatarBadge {...props} />
}
