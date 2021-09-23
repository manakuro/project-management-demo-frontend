import {
  AvatarGroup as ChakraAvatarGroup,
  AvatarGroupProps as ChakraAvatarGroupProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraAvatarGroupProps & {
  ref?: React.MutableRefObject<any>
}
export type AvatarGroupProps = Props

export const AvatarGroup: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraAvatarGroup {...props} ref={ref} />
))
