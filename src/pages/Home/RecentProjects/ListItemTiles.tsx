import React, { useCallback, useRef, useState } from 'react'
import {
  Flex,
  IconButton,
  Text,
  Icon,
  Fade,
  Avatar,
  AvatarGroup,
  FlexProps,
} from 'src/components/atoms'
import { useProject } from 'src/store/projects'
import { transitions } from 'src/styles'
import { useHover } from 'src/hooks/useHover'
import { findProjectIcon } from 'src/store/projects/projectIcons'
import { useClickableHover } from 'src/hooks'
import { MenuButton } from './MenuButton/MenuButton'

type Props = {
  projectId: string
}

const focusedStyle: FlexProps = {
  bg: 'gray.50',
  transform: 'translate(0, -5px)',
}
export const ListItemTiles: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const ref = useRef<HTMLElement | null>(null)
  const isHovering = useHover(ref)
  const { clickableHoverLightStyle } = useClickableHover()
  const [focused, setFocused] = useState(false)

  const handlePopoverProjectMenuOpened = useCallback(() => {
    setFocused(true)
  }, [])
  const handlePopoverProjectMenuClosed = useCallback(() => {
    setFocused(false)
  }, [])

  const showTransition = isHovering || focused

  return (
    <Flex
      borderRadius="3xl"
      _hover={focusedStyle}
      transition={transitions.base}
      w="152px"
      h="226px"
      alignItems="center"
      pt={4}
      cursor="pointer"
      flexDirection="column"
      ref={ref}
      {...(focused ? focusedStyle : {})}
    >
      <Flex
        borderRadius="lg"
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
          <Fade in={isHovering || focused}>
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
      <Text mt={2}>{project.name}</Text>
    </Flex>
  )
}
