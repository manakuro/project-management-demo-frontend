import { memo } from 'react'
import { Flex } from 'src/components/ui/atoms'
import { Tabs } from './Tabs'

export const Header = memo(function Header() {
  return (
    <Flex flex={1}>
      <Tabs />
    </Flex>
  )
})
