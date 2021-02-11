import React from 'react'
import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react'

type Props = DividerProps

export const Divider: React.FC<Props> = (props) => {
  return <ChakraDivider {...props} />
}
