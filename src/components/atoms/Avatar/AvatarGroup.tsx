import React from 'react'
import {
  AvatarGroup as ChakraAvatarGroup,
  AvatarGroupProps as ChakraAvatarGroupProps,
} from '@chakra-ui/react'

type Props = ChakraAvatarGroupProps
export type AvatarGroupProps = Props

export const AvatarGroup: React.FC<Props> = (props) => {
  return <ChakraAvatarGroup {...props} />
}
