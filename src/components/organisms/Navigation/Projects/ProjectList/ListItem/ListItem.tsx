import React, { memo } from 'react'
import {
  Flex,
  Link,
  NextLink,
  Text,
  Icon,
  ColorBox,
} from 'src/components/atoms'
import { useNavigation } from 'src/components/organisms/Navigation'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { PopoverProjectMenu } from 'src/components/organisms/Popovers'
import { useLinkHoverStyle, useClickableHoverStyle } from 'src/hooks'
import { ROUTE_PROJECTS_LIST } from 'src/router'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
}

export const ListItem: React.VFC<Props> = memo((props) => {
  const { isExpanded } = useNavigation()
  const { projectId } = props
  const { project } = useProject(projectId)
  const { _hover } = useLinkHoverStyle()
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <Flex p={2} px={PADDING_X} _hover={_hover} alignItems="center">
      <NextLink href={ROUTE_PROJECTS_LIST.href.pathnameObj(projectId)} passHref>
        <Link w="full">
          {isExpanded ? (
            <Flex alignItems="center">
              <ColorBox size="xs" color={project.color.color} />
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
})
ListItem.displayName = 'ListItem'
