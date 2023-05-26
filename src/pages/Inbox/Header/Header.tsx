import React, { memo } from 'react'
import { Flex } from 'src/components/ui/atoms'
import { Tabs } from './Tabs'

type Props = {}
export const Header: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex flex={1}>
      <Tabs />
    </Flex>
  )
})
Header.displayName = 'Header'
