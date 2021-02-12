import React from 'react'
import { Text, List, ListItem, Icon } from 'src/components/UI/atoms'
import { MAX_WIDTH, PADDING_X } from './Navigation'
import { Divider } from './Divider'
import { transitions } from 'src/styles'

export const NavigationFooter: React.VFC = () => {
  return (
    <List w={MAX_WIDTH}>
      <Divider />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover',
        }}
        transition={transitions.base}
        cursor="pointer"
      >
        <Icon icon="userPlus" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Invite teammates</Text>
      </ListItem>
      <Divider />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover',
        }}
        transition={transitions.base}
        cursor="pointer"
      >
        <Icon icon="help" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Help & getting started</Text>
      </ListItem>
    </List>
  )
}
