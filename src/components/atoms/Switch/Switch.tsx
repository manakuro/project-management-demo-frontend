import React from 'react'
import {
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraSwitchProps
export type SwitchProps = Props

export const Switch: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraSwitch {...props} ref={ref} />
))
