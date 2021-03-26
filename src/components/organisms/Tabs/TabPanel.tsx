import React from 'react'
import {
  TabPanel as ChakraTabPanel,
  TabPanelProps as ChakraTabPanelProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabPanelProps
export type TabPanelProps = Props

export const TabPanel: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabPanel {...props} ref={ref} />
))
