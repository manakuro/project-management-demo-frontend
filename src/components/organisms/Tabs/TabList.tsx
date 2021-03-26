import React from 'react'
import {
  TabList as ChakraTabList,
  TabListProps as ChakraTabListProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabListProps
export type TabListProps = Props

export const TabList: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabList {...props} ref={ref} />
))
