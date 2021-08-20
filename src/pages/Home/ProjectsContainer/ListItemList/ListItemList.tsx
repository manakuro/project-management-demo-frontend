import React from 'react'
import { Flex, IconButton, Text, Icon, AvatarGroup } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useClickableHoverStyle } from 'src/hooks'
import { useProject } from 'src/store/entities/projects'
import { findProjectIcon } from 'src/store/entities/projects/projectIcons'
import { useProjectsTeammateIds } from 'src/store/entities/projects/teammateIds'
import { MenuButton } from '../MenuButton/MenuButton'
import { Container } from './Container'

type Props = {
  projectId: string
}

export const ListItemList: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const { teammateIds } = useProjectsTeammateIds(props.projectId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <Container>
      <Flex
        borderRadius="lg"
        p={2}
        w={12}
        h={12}
        bg={project.color.color}
        color="white"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Icon size="md" icon={findProjectIcon(project.icon.id).icon} />
      </Flex>
      <Flex ml={3} flex={1} alignItems="flex-start">
        <Flex alignItems="center">
          <Text fontSize="sm">{project.name}</Text>
          <IconButton
            aria-label="favorite button"
            icon={<Icon icon="starOutline" size="xs" color="text.muted" />}
            variant="ghost"
            {...clickableHoverLightStyle}
          />
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <AvatarGroup size="xs" max={2} spacing={1} fontSize="xs">
          {teammateIds.map((id) => (
            <TeammateAvatar teammateId={id} key={id} />
          ))}
        </AvatarGroup>
        <MenuButton projectId={project.id} ml={2} />
      </Flex>
    </Container>
  )
}
