import React from 'react'
import { Flex } from 'src/components/ui/atoms'

type Props = {}

export const CustomNavList: React.FCWithChildren<Props> = (props) => {
  return <Flex flexDirection="column" {...props} />
}
