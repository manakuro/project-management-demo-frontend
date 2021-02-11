import React from 'react'
import { Flex, Text, List, ListIcon, ListItem } from 'src/components/UI/atoms'

export const Navigation: React.VFC = () => {
  return (
    <Flex
      as="nav"
      w="240px"
      backgroundColor="gray.800"
      flexDirection="column"
      color="white"
      px="6"
    >
      <Flex w="full" h="72px" alignItems="center">
        logo
      </Flex>
      <List spacing={3}>
        <ListItem display="flex" alignItems="center">
          <ListIcon icon="home" color="white" />
          <Text fontSize="md">Home</Text>
        </ListItem>
      </List>
    </Flex>
  )
}
