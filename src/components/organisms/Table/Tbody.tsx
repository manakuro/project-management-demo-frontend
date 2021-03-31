import React from 'react'
import {
  Tbody as ChakraTbody,
  TableBodyProps as ChakraTbodyProps,
} from '@chakra-ui/react'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTbodyProps
export type TbodyProps = Props

export const Tbody: React.FC<Props> = forwardRef<Props, 'tbody'>(
  (props, ref) => <ChakraTbody {...props} ref={ref} />,
)
