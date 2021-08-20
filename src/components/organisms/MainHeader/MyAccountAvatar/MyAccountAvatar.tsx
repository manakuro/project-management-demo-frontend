import React, { memo, useCallback } from 'react'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { MyAvatar } from 'src/components/organisms/MyAvatar'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

export const MyAccountAvatar: React.FC = memo(() => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  return (
    <Menu
      placement="bottom-end"
      closeOnBlur={false}
      closeOnSelect={false}
      isOpen={isOpen}
      isLazy
    >
      <MenuButton onClick={handleOpen} cursor="pointer">
        <MyAvatar size="sm" />
      </MenuButton>
      {isOpen && <MenuList onCloseMenu={onClose} />}
    </Menu>
  )
})
MyAccountAvatar.displayName = 'MyAccountAvatar'
