import React, { useCallback } from 'react'
import { Text, ListItem, Icon } from 'src/components/atoms'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { useHelp } from 'src/components/organisms/Navigation/Help'
import { transitions } from 'src/styles'
import { PADDING_X } from '../Navigation'

export const Help: React.FC = () => {
  const { setIsOpen } = useHelp()

  const handleClick = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <>
      <Divider />
      <ListItem
        display="flex"
        alignItems="center"
        px={PADDING_X}
        py={4}
        _hover={{
          bg: 'navigation.hover.dark',
        }}
        transition={transitions.base()}
        cursor="pointer"
        onClick={handleClick}
      >
        <Icon icon="help" color="primary" mr={PADDING_X} mt="-2px" />
        <Text fontSize="sm">Help & getting started</Text>
      </ListItem>
    </>
  )
}
