import React from 'react'
import { Tab as ChakraTab, TabProps as ChakraTabProps } from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabProps
export type TabProps = Props

export const Tab: React.FC<Props> = forwardRef((props, ref) => (
  <ChakraTab {...props} ref={ref} />
))
