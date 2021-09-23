import React, { memo, useMemo } from 'react'
import { Flex, Link, NextLink, Text, ColorBox } from 'src/components/atoms'
import { useNavigation, PADDING_X } from 'src/components/organisms/Navigation'
import { useLinkHoverStyle } from 'src/hooks'
import { ROUTE_PROJECTS_LIST, useRouter } from 'src/router'
import { ROUTE_PROJECTS } from 'src/router/projects'
import { useProject } from 'src/store/entities/projects'
import { ProjectMenu } from './ProjectMenu'

type Props = {
  projectId: string
}

export const ListItem: React.VFC<Props> = memo((props) => {
  const { isExpanded } = useNavigation()
  const { projectId } = props
  const { project } = useProject(projectId)
  const { _hover, selectedStyle } = useLinkHoverStyle()
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
              <ColorBox size="xs" color={project.color.color} />
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
