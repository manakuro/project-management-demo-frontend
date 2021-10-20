import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TagChip } from 'src/components/molecules'

type Props = FlexProps & {
  tagId: string
}

export const Tag: React.VFC<Props> = memo<Props>((props) => {
  const { tagId } = props

  return (
    <>
      <TagChip tagId={tagId} variant="icon" />
    </>
  )
})
Tag.displayName = 'Tag'
