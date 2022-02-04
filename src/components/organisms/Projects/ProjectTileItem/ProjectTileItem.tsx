import React, { memo } from 'react'
import {
  Flex,
  Icon,
  Fade,
  AvatarGroup,
  IconButton,
  FlexProps,
} from 'src/components/atoms'
import { PopoverProjectMenu } from 'src/components/organisms/Popovers'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { IconType } from 'src/shared/icons'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'
import { useProjectIcon } from 'src/store/entities/projectIcons'
import { useProject } from 'src/store/entities/projects'
import { useTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { transitions } from 'src/styles'
import { Container } from './Container'
import { FavoriteButton } from './FavoriteButton'

type Props = {
  projectId: string
  containerStyle?: FlexProps
}

export const ProjectTileItem: React.VFC<Props> = memo((props) => {
  const { projectId, containerStyle } = props
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)
  const { projectIcon } = useProjectIcon(project.projectIconId)
  const { teammateIds } = useTeammateIdsByProjectId(projectId)

  return (
    <Container name={project.name} {...containerStyle}>
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
          bg={projectBaseColor.color.color}
          color="white"
          position="relative"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Flex position="absolute" top="10px" left={2}>
            <Fade in={showTransition}>
              <FavoriteButton projectId={projectId} />
            </Fade>
          </Flex>

          <Flex position="absolute" top={2} right={2}>
            <Fade in={showTransition}>
              <PopoverProjectMenu
                addFavorite
                editNamesAndDescriptionProject
                copyProjectLink
                share
                projectId={project.id}
                iconButton={{
                  as: IconButton,
                  'aria-label': 'menu button',
                  icon: <Icon icon="menu" size="xs" />,
                  variant: 'ghost',
                  light: true,
                }}
                onOpened={handlePopoverProjectMenuOpened}
                onClosed={handlePopoverProjectMenuClosed}
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
            <Icon size="3xl" icon={projectIcon.icon.icon as IconType} />
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
})
ProjectTileItem.displayName = 'ProjectTileItem'
