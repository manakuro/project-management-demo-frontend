import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react'
import React from 'react'

type Props = DividerProps

export const Divider: React.FC<Props> = (props) => {
  return <ChakraDivider {...props} />
}
