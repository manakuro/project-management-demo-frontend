import React, { memo, useMemo } from 'react'
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
import { ROUTE_PROJECTS_LIST, useRouter } from 'src/router'
import { ROUTE_PROJECTS } from 'src/router/projects'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColors'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
}

export const ListItem: React.VFC<Props> = memo((props) => {
  const { isExpanded } = useNavigation()
  const { projectId } = props
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)
  const { _hover, selectedStyle } = useLinkHoverStyle()
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { router } = useRouter()
  const selected = useMemo(
    () => router.asPath.includes(ROUTE_PROJECTS.href.pathname(projectId)),
    [projectId, router.asPath],
  )

  return (
    <NextLink href={ROUTE_PROJECTS_LIST.href.pathnameObj(projectId)} passHref>
      <Link
        w="full"
        p={2}
        px={PADDING_X}
        _hover={_hover}
        {...(selected ? selectedStyle : {})}
      >
        <Flex alignItems="center">
          {isExpanded ? (
            <Flex alignItems="center" flex={1}>
              <ColorBox size="xs" color={projectBaseColor.color.color} />
              <Text fontSize="sm" flex={1} ml={2}>
                {project.name}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center" flex={1}>
              <Text fontSize="sm" flex={1}>
                {project.name.slice(0, 3)}
              </Text>
            </Flex>
          )}
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
      </Link>
    </NextLink>
  )
})
ListItem.displayName = 'ListItem'
