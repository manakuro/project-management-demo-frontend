import React from 'react'
import {
  Flex,
  Link,
  NextLink,
  Text,
  Icon,
  Box,
  BoxProps,
} from 'src/components/atoms'
import { PopoverProjectMenu, useNavigation } from 'src/components/organisms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useLinkHover, useClickableHover } from 'src/hooks'
import { useProject } from 'src/store/projects'

type Props = {
  projectId: string
}

export const ListItem: React.VFC<Props> = (props) => {
  const { isExpanded } = useNavigation()
  const { project } = useProject(props.projectId)
  const { _hover } = useLinkHover()
  const { clickableHoverLightStyle } = useClickableHover()

  return (
    <Flex p={2} px={PADDING_X} _hover={_hover} alignItems="center">
      <NextLink href="home" passHref>
        <Link w="full">
          {isExpanded ? (
            <Flex alignItems="center">
              <ColorBox w={2} h={2} bg={project.color.color} />
              <Text fontSize="sm" flex={1} ml={2}>
                {project.name}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center">
              <Text fontSize="sm" flex={1}>
                {project.name.slice(0, 3)}
              </Text>
            </Flex>
          )}
        </Link>
      </NextLink>
      <PopoverProjectMenu
        addFavorite
        duplicateProject
        archiveProject
        deleteProject
        projectId={props.projectId}
        menuButtonStyle={{ ...clickableHoverLightStyle }}
      >
        <Icon icon="dotsHorizontalRounded" />
      </PopoverProjectMenu>
    </Flex>
  )
}

const ColorBox: React.FC<BoxProps> = (props) => (
  <Box borderRadius="sm" {...props} />
)
