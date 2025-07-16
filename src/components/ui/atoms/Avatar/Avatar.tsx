import {
  Avatar as ChakraAvatar,
  type AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react'
import type React from 'react'

type Props = ChakraAvatarProps
export type AvatarProps = Props

export const Avatar: React.FC<Props> = (props) => {
  return <ChakraAvatar border="none" bg="teal.200" {...props} />
}
