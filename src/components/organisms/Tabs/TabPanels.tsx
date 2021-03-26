import React from 'react'
import {
  TabPanels as ChakraTabPanels,
  TabPanelsProps as ChakraTabPanelsProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabPanelsProps
export type TabPanelsProps = Props

export const TabPanels: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabPanels {...props} ref={ref} />
))
