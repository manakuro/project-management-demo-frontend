import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TagChip, Tooltip } from 'src/components/molecules'
import { useTag } from 'src/store/entities/tags'

type Props = FlexProps & {
  tagId: string
}

export const Tag: React.VFC<Props> = memo<Props>((props) => {
  const { tagId } = props
  const { taskTag } = useTag(tagId)

  return (
    <Tooltip
      hasArrow
      label={taskTag.tag.name}
      aria-label={taskTag.tag.name}
      withIcon
      openDelay={500}
    >
      <TagChip tagId={tagId} variant="icon" />
    </Tooltip>
  )
})
Tag.displayName = 'Tag'
