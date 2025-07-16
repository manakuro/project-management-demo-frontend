import type React from 'react'
import { useCallback } from 'react'
import { Divider } from 'src/components/features/organisms/Navigation/Divider'
import { Icon, ListItem, Text } from 'src/components/ui/atoms'
import { setErrorToken } from 'src/shared/apollo/client'
import { transitions } from 'src/styles'
import { PADDING_X } from '../Navigation'

export const ResetToken: React.FC = () => {
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
