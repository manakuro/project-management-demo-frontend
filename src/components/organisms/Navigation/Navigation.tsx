import React from 'react'
import { Box, Flex } from 'src/components/atoms'
import { CustomNav } from './CustomNav'
import { Footer } from './Footer'
import { Header } from './Header'
import { MainNav } from './MainNav'
import { Projects } from './Projects'
import { useNavigation } from './useNavigation'

export const PADDING_X = 4
export const MAX_WIDTH = '240px'
export const MIN_WIDTH = '53px'
export const Navigation: React.VFC = () => {
  const { isExpanded } = useNavigation()

  return (
    <Flex
      as="nav"
      w={isExpanded ? MAX_WIDTH : MIN_WIDTH}
      backgroundColor="gray.800"
      flexDirection="column"
      color="white"
      transition="width .25s cubic-bezier(0.820, 0.085, 0.395, 0.895)"
      overflowX="hidden"
      h="100vh"
      flex="0 0 auto"
    >
      <Header />
      <MainNav />
      <Box overflow="scroll" w={MAX_WIDTH} pb={40} flex="1">
        <CustomNav />
        <Projects />
      </Box>
      <Footer />
    </Flex>
  )
}
