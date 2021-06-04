import React, { memo, useCallback } from 'react'
import { Box, Button, ColorBox, Icon, Text } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
  onDelete?: () => void
  deletable?: boolean
}

export const ProjectChip: React.VFC<Props> = memo((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      props.onDelete?.()
    },
    [props],
  )

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
      <ColorBox size="xs" color={project.color.color} />
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
