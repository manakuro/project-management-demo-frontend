import React, { memo, useCallback } from 'react'
import { Box, Button, Icon, IconProps, Text } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTaskTag } from 'src/store/entities/taskTag'

type Variant = 'button' | 'icon'

type Props = {
  taskTagId: string
  variant: Variant
  onDelete?: () => void
  deletable?: boolean
  iconProps?: Omit<IconProps, 'icon'>
}

export const TagChip: React.VFC<Props> = memo<Props>((props) => {
  const { taskTagId, variant, iconProps } = props
  const { taskTag } = useTaskTag(taskTagId)
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      props.onDelete?.()
    },
    [props],
  )

  if (variant === 'icon') {
    return (
      <Icon
        icon="tag"
        color={taskTag.tag.color.color}
        size="sm"
        {...iconProps}
      />
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
      bg={taskTag.tag.color.color}
      _hover={{
        bg: taskTag.tag.color.color,
      }}
    >
      <Text fontSize="xs" isTruncated color="text.base">
        {taskTag.tag.name}
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
TagChip.displayName = 'TagChip'
