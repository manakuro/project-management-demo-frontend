import React, { memo } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { useTagIdsByTaskId } from 'src/store/entities/tags'
import { Tag } from './Tag'

type Props = FlexProps & {
  taskId: string
}

export const Tags: React.VFC<Props> = memo<Props>((props) => {
  const { tagIds } = useTagIdsByTaskId(props.taskId)

  return (
    <Stack direction="row" spacing={1} overflow="hidden">
      {tagIds.map((id) => (
        <Tag tagId={id} key={id} />
      ))}
    </Stack>
  )
})
Tags.displayName = 'Tags'
