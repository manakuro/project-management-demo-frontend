import React from 'react'
import {
  Flex,
  Icon,
  Fade,
  AvatarGroup,
  FavoriteButton,
} from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms'
import { MenuButton } from 'src/pages/Home/ProjectsContainer/MenuButton/MenuButton'
import { useProject } from 'src/store/entities/projects'
import { findProjectIcon } from 'src/store/entities/projects/projectIcons'
import { useProjectsTeammateIds } from 'src/store/entities/projects/teammateIds'
import { transitions } from 'src/styles'
import { Container } from './Container'

type Props = {
  projectId: string
}

export const ListItemTile: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const { teammateIds } = useProjectsTeammateIds(props.projectId)

  return (
    <Container name={project.name}>
      {({
        showTransition,
        handlePopoverProjectMenuClosed,
        handlePopoverProjectMenuOpened,
      }) => (
        <Flex
          borderRadius="3xl"
          p={2}
          w="120px"
          h="120px"
          bg={project.color.color}
          color="white"
          position="relative"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex position="absolute" top={2} left={2}>
            <Fade in={showTransition}>
              <FavoriteButton favoriteProjectId={props.projectId} />
            </Fade>
          </Flex>

          <Flex position="absolute" top={2} right={2}>
            <Fade in={showTransition}>
              <MenuButton
                onOpened={handlePopoverProjectMenuOpened}
                onClosed={handlePopoverProjectMenuClosed}
                projectId={project.id}
                light
              />
            </Fade>
          </Flex>

          <Flex
            {...(showTransition
              ? {
                  transform: 'translate(0, -3px)',
                }
              : {})}
            transition={transitions.base()}
            position="relative"
          >
            <Icon size="3xl" icon={findProjectIcon(project.icon.id).icon} />
          </Flex>

          {showTransition && (
            <Flex position="absolute" bottom={3}>
              <Fade in>
                <AvatarGroup size="xs" max={2}>
                  {teammateIds.map((id) => (
                    <TeammateAvatar teammateId={id} key={id} />
                  ))}
                </AvatarGroup>
              </Fade>
            </Flex>
          )}
        </Flex>
      )}
    </Container>
  )
}
