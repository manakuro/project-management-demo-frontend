import React, { memo, useCallback } from 'react'
import { ListItem } from '../ListItem'
import { Tag } from 'src/store/entities/tags'

type Props = {
  onClick: (tag: string) => void
  tag: Tag
  index: number
}

export const TagItem: React.FC<Props> = memo<Props>((props) => {
  const { tag } = props
  const handleClick = useCallback(() => {
    props.onClick(tag.id)
  }, [tag.id, props])

  return (
    <ListItem index={props.index} onClick={handleClick}>
      {tag.name}
    </ListItem>
  )
})
