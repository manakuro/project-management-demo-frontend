import React from 'react'
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react'

type Props = ChakraAvatarProps
export type AvatarProps = Props

export const Avatar: React.FC<Props> = (props) => {
  return <ChakraAvatar {...props} />
}
