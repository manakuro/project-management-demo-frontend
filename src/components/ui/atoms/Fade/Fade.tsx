import {
  Fade as ChakraFade,
  type FadeProps as ChakraFadeProps,
} from '@chakra-ui/react'
import type React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraFadeProps
export type FadeProps = Props

export const Fade: React.FC<Props> = forwardRef<Props, 'div'>((props, ref) => (
  <ChakraFade {...props} ref={ref} />
))
