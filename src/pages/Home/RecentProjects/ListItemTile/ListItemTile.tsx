import React from 'react'
import {
  Flex,
  IconButton,
  Icon,
  Fade,
  Avatar,
  AvatarGroup,
} from 'src/components/atoms'
import { useProject } from 'src/store/projects'
import { transitions } from 'src/styles'
import { findProjectIcon } from 'src/store/projects/projectIcons'
import { useClickableHover } from 'src/hooks'
import { MenuButton } from 'src/pages/Home/RecentProjects/MenuButton/MenuButton'
import { Container } from './Container'

type Props = {
  projectId: string
}

export const ListItemTile: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const { clickableHoverLightStyle } = useClickableHover()

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
              <IconButton
                aria-label="favorite button"
                icon={<Icon icon="starOutline" size="xs" />}
                variant="ghost"
                {...clickableHoverLightStyle}
              />
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
            transition={transitions.base}
            position="relative"
          >
            <Icon size="3xl" icon={findProjectIcon(project.icon.id).icon} />
          </Flex>

          {showTransition && (
            <Flex position="absolute" bottom={3}>
              <Fade in>
                <AvatarGroup size="xs" max={2}>
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
              </Fade>
            </Flex>
          )}
        </Flex>
      )}
    </Container>
  )
}
