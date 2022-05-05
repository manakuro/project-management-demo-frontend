import React, { useCallback } from 'react'
import { Text, ListItem, Icon } from 'src/components/atoms'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { setErrorToken } from 'src/shared/apollo/client'
import { transitions } from 'src/styles'
import { PADDING_X } from '../Navigation'

export const ResetToken: React.VFC = () => {
  const handleClick = useCallback(() => {
    setErrorToken()
  }, [])

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
        <Text fontSize="sm">Set error Token</Text>
      </ListItem>
    </>
  )
}
