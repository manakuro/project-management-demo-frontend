import {
  Collapse as ChakraCollapse,
  CollapseProps as ChakraCollapseProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraCollapseProps
export type CollapseProps = Props

export const Collapse: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraCollapse {...props} ref={ref} />,
)
