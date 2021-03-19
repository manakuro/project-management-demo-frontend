import React, { useRef } from 'react'
import {
  Flex,
  IconButton,
  Text,
  Icon,
  Fade,
  Avatar,
  AvatarGroup,
} from 'src/components/atoms'
import { useProject } from 'src/store/projects'
import { transitions } from 'src/styles'
import { useHover } from 'src/hooks/useHover'
import { findProjectIcon } from 'src/store/projects/projectIcons'

type Props = {
  projectId: string
}

export const ListItemTiles: React.VFC<Props> = (props) => {
  const { project } = useProject(props.projectId)
  const ref = useRef(null)
  const isHovering = useHover(ref)

  return (
    <Flex
      borderRadius="3xl"
      _hover={{ bg: 'gray.50', transform: 'translate(0, -5px)' }}
      transition={transitions.base}
      w="152px"
      h="226px"
      alignItems="center"
      pt={4}
      cursor="pointer"
      flexDirection="column"
      ref={ref}
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
          <Fade in={isHovering}>
            <IconButton
              aria-label="favorite button"
              icon={<Icon icon="starOutline" size="xs" />}
              light
              variant="ghost"
            />
          </Fade>
        </Flex>

        <Flex position="absolute" top={2} right={2}>
          <Fade in={isHovering}>
            <IconButton
              aria-label="favorite button"
              icon={<Icon icon="menu" size="xs" />}
              light
              variant="ghost"
            />
          </Fade>
        </Flex>

        <Flex
          {...(isHovering
            ? {
                transform: 'translate(0, -3px)',
              }
            : {})}
          transition={transitions.base}
          position="relative"
        >
          <Icon size="3xl" icon={findProjectIcon(project.icon.id).icon} />
        </Flex>

        {isHovering && (
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
