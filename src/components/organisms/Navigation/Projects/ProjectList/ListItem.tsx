import React, { useCallback } from 'react'
import {
  Flex,
  Link,
  NextLink,
  Text,
  Icon,
  Box,
  Portal,
  BoxProps,
} from 'src/components/atoms'
import {
  MenuList,
  MenuItem as AtomsMenuItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemProps,
  PopoverSetColorAndIcon,
} from 'src/components/organisms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHover, useClickableHover } from 'src/hooks'
import { Project } from './types'
import { useDisclosure } from 'src/shared/chakra'

type Props = {
  project: Project
}

export const ListItem: React.VFC<Props> = (props) => {
  const { _hover } = useLinkHover()
  const clickableStyle = useClickableHover()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      <Menu placement="bottom-end" onClose={handleClose} isLazy>
        <NextLink href={props.project.href} passHref>
          <Link p={2} px={PADDING_X} _hover={_hover}>
            <Flex alignItems="center">
              <ColorBox w={2} h={2} bg={props.project.color} />
              <Text fontSize="sm" flex={1} ml={3}>
                {props.project.name}
              </Text>
              <MenuButton {...clickableStyle}>
                <Icon icon="dotsHorizontalRounded" />
              </MenuButton>
            </Flex>
          </Link>
        </NextLink>
        <Portal>
          <MenuList color="text.base">
            <MenuItem
              icon={<ColorBox w={4} h={4} bg={props.project.color} mt="-1px" />}
              onMouseEnter={handleOpen}
            >
              <PopoverSetColorAndIcon
                project={{
                  color: {
                    id: 1,
                    name: 'gray',
                    color: 'gray.400',
                  },
                  icon: {
                    id: 1,
                  },
                }}
                isOpen={isOpen}
                placement="right-end"
              >
                <Flex>
                  <Text fontSize="sm" flex={1}>
                    Set Color & icon
                  </Text>
                  <Icon icon="chevronRight" />
                </Flex>
              </PopoverSetColorAndIcon>
            </MenuItem>
            <MenuDivider />
            <MenuItem onMouseEnter={handleClose}>Add to Favorites</MenuItem>
            <MenuItem onMouseEnter={handleClose}>Duplicate Project</MenuItem>
            <MenuItem onMouseEnter={handleClose}>Archive Project</MenuItem>
            <MenuItem onMouseEnter={handleClose} color="alert">
              Delete Project
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
}

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <AtomsMenuItem fontSize="sm" iconSpacing={3} {...props} />
)

const ColorBox: React.FC<BoxProps> = (props) => (
  <Box borderRadius="sm" {...props} />
)
