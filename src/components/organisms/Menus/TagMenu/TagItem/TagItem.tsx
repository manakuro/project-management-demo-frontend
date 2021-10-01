import React, { memo, useCallback } from 'react'
import { SearchMenuListItem } from 'src/components/organisms/Menus/SearchMenu'
import { Tag } from 'src/store/entities/tags'

type Props = {
  onClick: (tag: string) => void
  tag: Tag
  index: number
}

export const TagItem: React.FC<Props> = memo<Props>((props) => {
  const { tag } = props

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      props.onClick(tag.id)
    },
    [tag.id, props],
  )

  return (
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      {tag.name}
    </SearchMenuListItem>
  )
})
