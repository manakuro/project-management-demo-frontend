import {
  TabPanel as ChakraTabPanel,
  TabPanelProps as ChakraTabPanelProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabPanelProps
export type TabPanelProps = Props

export const TabPanel: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabPanel p={0} h="full" {...props} ref={ref} />
))
