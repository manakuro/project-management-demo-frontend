import React, { memo, useEffect } from 'react'
import {
  Avatar,
  Flex,
  Icon,
  Input as AtomsInput,
  Portal,
  Text,
} from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from 'src/components/organisms'

type Props = {
  onClickOutside: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { ref, hasClickedOutside } = useClickOutside()

  useEffect(() => {
    if (hasClickedOutside) {
      props.onClickOutside()
    }
  })

  return (
    <>
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        placeholder="mana"
        ml={2}
        w={60}
      />
      <Menu
        defaultIsOpen
        placement="bottom-end"
        isLazy
        closeOnBlur={false}
        closeOnSelect={false}
      >
        <MenuButton />
        <Portal>
          <MenuList zIndex="popover" w="450px" mr={-3} mt={2}>
            <MenuItem>
              <Flex alignItems="center">
                <Avatar
                  name="Manato Kuroda"
                  src="/images/cat_img.png"
                  size="xs"
                  cursor="pointer"
                  bg="teal.200"
                />
                <Text ml={2} fontSize="sm">
                  mana
                </Text>
                <Text ml={5} fontSize="xs" color="text.muted">
                  d7108100@gmail.com
                </Text>
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon icon="userPlus" color="primary" />}
              color="primary"
              fontWeight="medium"
            >
              Invite teammates via email
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon icon="plus" color="primary" />}
              color="primary"
              fontWeight="medium"
            >
              Assign duplicate tasks
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
})
