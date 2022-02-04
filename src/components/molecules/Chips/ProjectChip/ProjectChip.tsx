import React, { memo, useCallback } from 'react'
import { Badge, Box, Button, ColorBox, Icon, Text } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useProject } from 'src/store/entities/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'

type Variant = 'badge' | 'button'

type Props = {
  projectId: string
  variant: Variant
  onDelete?: () => void
  deletable?: boolean
  onClick?: () => void
}

export const ProjectChip: React.VFC<Props> = memo((props) => {
  const { projectId, onClick } = props
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      props.onDelete?.()
    },
    [props],
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onClick?.()
    },
    [onClick],
  )

  if (props.variant === 'badge') {
    return (
      <Badge
        variant="solid"
        bg={projectBaseColor.color.color}
        textAlign="center"
        onClick={handleClick}
      >
        {project.name}
      </Badge>
    )
  }

  return (
    <Button
      as={Box}
      size="xs"
      border="1px"
      borderColor="transparent"
      cursor="pointer"
      borderRadius="full"
      minH={5}
      h={5}
      _hover={{ bg: 'gray.100' }}
    >
      <ColorBox size="xs" color={projectBaseColor.color.color} />
      <Text ml={2} fontSize="xs" isTruncated color="text.base">
        {project.name}
      </Text>
      {props.deletable && (
        <Icon
          ml={1}
          mt="1px"
          icon="x"
          color="text.muted"
          size="sm"
          {...clickableHoverLightStyle}
          onClick={handleDelete}
        />
      )}
    </Button>
  )
})
ProjectChip.displayName = 'ProjectChip'
