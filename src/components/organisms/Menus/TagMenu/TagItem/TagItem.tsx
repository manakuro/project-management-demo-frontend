import React, { memo, useCallback } from 'react'
import { Tag } from 'src/store/entities/tags'
import { ListItem } from '../ListItem'

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
