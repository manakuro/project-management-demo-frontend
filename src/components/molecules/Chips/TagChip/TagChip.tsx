import React, { memo, useCallback } from 'react'
import { Box, Button, Icon, Text } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useTag } from 'src/store/entities/tags'

type Props = {
  tagId: string
  onDelete?: () => void
  deletable?: boolean
}

export const TagChip: React.VFC<Props> = memo((props) => {
  const { tagId } = props
  const { tag } = useTag(tagId)
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
      bg={tag.color.color}
      _hover={{
        bg: tag.color.color,
      }}
    >
      <Text fontSize="xs" isTruncated color="text.base">
        {tag.name}
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
