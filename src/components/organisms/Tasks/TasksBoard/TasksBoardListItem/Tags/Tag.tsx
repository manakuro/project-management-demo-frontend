import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TagChip, Tooltip } from 'src/components/molecules'
import { useTaskTag } from 'src/store/entities/taskTag'

type Props = FlexProps & {
  taskTagId: string
}

export const Tag: React.VFC<Props> = memo<Props>((props) => {
  const { taskTagId } = props
  const { taskTag } = useTaskTag(taskTagId)

  return (
    <Tooltip
      hasArrow
      label={taskTag.tag.name}
      aria-label={taskTag.tag.name}
      withIcon
      openDelay={500}
    >
      <TagChip taskTagId={taskTagId} variant="icon" />
    </Tooltip>
  )
})
Tag.displayName = 'Tag'
