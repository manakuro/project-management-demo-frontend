import React, { useCallback, useState } from 'react'
import { Flex } from 'src/components/UI/atoms'
import { CustomNav } from './CustomNav'
import { Footer } from './Footer'
import { Header } from './Header'
import { MainNav } from './MainNav'

export const PADDING_X = 4
export const MAX_WIDTH = '240px'
export const MIN_WIDTH = '53px'
export const Navigation: React.VFC = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleMenu = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <Flex
      as="nav"
      w={isExpanded ? MAX_WIDTH : MIN_WIDTH}
      backgroundColor="gray.800"
      flexDirection="column"
      color="white"
      transition="width .25s cubic-bezier(0.820, 0.085, 0.395, 0.895)"
      overflowX="hidden"
      position="fixed"
      h="100vh"
    >
      <Header isExpanded={isExpanded} toggleMenu={toggleMenu} />
      <MainNav />
      <CustomNav isExpanded={isExpanded} />
      <Footer />
    </Flex>
  )
}
