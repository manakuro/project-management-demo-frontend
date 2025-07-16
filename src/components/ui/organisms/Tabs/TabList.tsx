import {
  TabList as ChakraTabList,
  type TabListProps as ChakraTabListProps,
} from '@chakra-ui/react'
import type React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabListProps
export type TabListProps = Props

export const TabList: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTabList borderBottom="none" {...props} ref={ref} />
))
