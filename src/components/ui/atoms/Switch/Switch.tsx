import {
  Switch as ChakraSwitch,
  type SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/react'
import type React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraSwitchProps
export type SwitchProps = Props

export const Switch: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraSwitch {...props} ref={ref} />
))
