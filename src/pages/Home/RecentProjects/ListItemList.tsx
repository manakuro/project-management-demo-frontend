import React from 'react'
import {
  Flex,
  IconButton,
  Text,
  Icon,
  Avatar,
  AvatarGroup,
} from 'src/components/atoms'
import { useProject } from 'src/store/projects'
import { findProjectIcon } from 'src/store/projects/projectIcons'
import { useClickableHover } from 'src/hooks'
import { PADDING_X } from './RecentProjects'

type Props = {
  projectId: string
}

export const ListItemList: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const { clickableHoverStyle, clickableHoverLightStyle } = useClickableHover()

  return (
    <Flex
      w="full"
      borderBottom="1px"
      borderColor="gray.200"
      py={3}
      px={PADDING_X}
      {...clickableHoverStyle}
    >
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
          {project.teammates.map((t, k) => (
            <Avatar
              key={k}
              name={t.name}
              src={t.image}
              bg="teal.200"
              border="none"
            />
          ))}
        </AvatarGroup>
        <IconButton
          aria-label="menu button"
          icon={<Icon icon="menu" size="xs" color="text.muted" />}
          variant="ghost"
          ml={2}
        />
      </Flex>
    </Flex>
  )
}
