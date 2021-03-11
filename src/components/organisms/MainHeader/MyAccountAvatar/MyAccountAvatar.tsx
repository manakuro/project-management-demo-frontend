import React, { useCallback } from 'react'
import { Avatar } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'

export const MyAccountAvatar: React.FC = (props) => {
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
      <MenuButton onClick={handleOpen}>
        <Avatar
          name="Manato Kuroda"
          src="/images/cat_img.png"
          size="sm"
          cursor="pointer"
          bg="teal.200"
        />
      </MenuButton>
      {isOpen && <MenuList onCloseMenu={onClose} />}
    </Menu>
  )
}
