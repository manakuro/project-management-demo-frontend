import React, { memo, useMemo } from 'react'
import { useNavigation, PADDING_X } from 'src/components/organisms/Navigation'
import { Flex, Link, NextLink, Text, ColorBox } from 'src/components/ui/atoms'
import { useLinkHoverStyle } from 'src/hooks'
import { ROUTE_PROJECTS_LIST, useRouter } from 'src/router'
import { ROUTE_PROJECTS } from 'src/router/projects'
import { useProject } from 'src/store/entities/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'
import { ProjectMenu } from './ProjectMenu'

type Props = {
  projectId: string
}

export const ListItem: React.FC<Props> = memo((props) => {
  const { isExpanded } = useNavigation()
  const { projectId } = props
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)
  const { _hover, selectedStyle } = useLinkHoverStyle()
  const { router } = useRouter()
  const selected = useMemo(
    () => router.asPath.includes(ROUTE_PROJECTS.href.pathname(projectId)),
    [projectId, router.asPath],
  )

  return (
    <NextLink
      href={ROUTE_PROJECTS_LIST.href.pathnameObj(projectId)}
      passHref
      legacyBehavior
    >
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
              <ColorBox size="xs" ml={1} color={projectBaseColor.color.color} />
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
          <ProjectMenu projectId={projectId} />
        </Flex>
      </Link>
    </NextLink>
  )
})
ListItem.displayName = 'ListItem'
