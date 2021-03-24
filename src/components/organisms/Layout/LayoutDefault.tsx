import React from 'react'
import { Flex } from 'src/components/atoms'
import { Navigation } from 'src/components/organisms'

export const LayoutDefault: React.FC = (props) => {
  return (
    <Flex
      w="full"
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      overflow="hidden"
      {...props}
    >
      <Navigation />
      <Flex flex="1" flexDirection="column" minW="920px">
        <Flex
          as="main"
          flex="1 1 auto"
          flexDirection="column"
          overflowY="scroll"
        >
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getLayoutDefault = (page: any) => (
  <LayoutDefault>{page}</LayoutDefault>
)
