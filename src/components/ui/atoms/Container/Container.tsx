import {
  Container as ChakraContainer,
  ContainerProps as ChakraContainerProps,
} from '@chakra-ui/react'
import React from 'react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraContainerProps
export type ContainerProps = Props

export const Container: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => <ChakraContainer {...props} ref={ref} />,
)
