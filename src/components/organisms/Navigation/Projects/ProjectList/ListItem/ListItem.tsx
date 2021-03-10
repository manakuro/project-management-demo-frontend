import React, { useCallback } from 'react'
import {
  Flex,
  Link,
  NextLink,
  Text,
  Icon,
  Box,
  BoxProps,
} from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHover, useClickableHover } from 'src/hooks'
import { useDisclosure } from 'src/shared/chakra'
import { MenuList } from './MenuList'
import { useProject } from 'src/store/projects'

type Props = {
  projectId: string
}

export const ListItem: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const { _hover } = useLinkHover()
  const clickableStyle = useClickableHover()
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])

  return (
    <>
      <Menu
        placement="bottom-end"
        closeOnBlur={false}
        closeOnSelect={false}
        isOpen={isOpen}
        isLazy
      >
        <NextLink href="home" passHref>
          <Link p={2} px={PADDING_X} _hover={_hover}>
            <Flex alignItems="center">
              <ColorBox w={2} h={2} bg={project.color.color} />
              <Text fontSize="sm" flex={1} ml={3}>
                {project.name}
              </Text>
              <MenuButton {...clickableStyle} onClick={handleOpen}>
                <Icon icon="dotsHorizontalRounded" />
              </MenuButton>
            </Flex>
          </Link>
        </NextLink>
        {isOpen && <MenuList project={project} onCloseMenu={onClose} />}
      </Menu>
    </>
  )
}

const ColorBox: React.FC<BoxProps> = (props) => (
  <Box borderRadius="sm" {...props} />
)
