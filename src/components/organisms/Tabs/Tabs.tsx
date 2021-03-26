import React from 'react'
import {
  Tabs as ChakraTabs,
  TabsProps as ChakraTabsProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabsProps
export type TabsProps = Props

export const Tabs: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabs {...props} ref={ref} />
))
