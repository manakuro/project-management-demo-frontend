import React from 'react'
import { Text, List, ListItem, Icon, Divider } from 'src/components/UI/atoms'
import { MAX_WIDTH, PADDING_X } from './Navigation'

export const NavigationFooter: React.VFC = () => {
  return (
    <List w={MAX_WIDTH}>
      <Divider color="gray.400" opacity={0.15} />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover',
        }}
        cursor="pointer"
      >
        <Icon icon="idCard" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Invite teammates</Text>
      </ListItem>
      <Divider color="gray.400" opacity={0.15} />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover',
        }}
        cursor="pointer"
      >
        <Icon icon="help" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Help & getting started</Text>
      </ListItem>
    </List>
  )
}
