import React from 'react'
import { Text, ListItem, Icon } from 'src/components/atoms'
import { PADDING_X } from '../Navigation'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { transitions } from 'src/styles'

export const Help: React.VFC = () => {
  return (
    <>
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
    </>
  )
}
