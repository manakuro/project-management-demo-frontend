import React, { memo, useCallback } from 'react'
import { SearchMenuListItem } from 'src/components/organisms/Menus/SearchMenu'
import { TaskTag } from 'src/store/entities/taskTag'

type Props = {
  onClick: (taskTag: string) => void
  taskTag: TaskTag
  index: number
}

export const TagItem: React.FC<Props> = memo<Props>((props) => {
  const { taskTag } = props

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      props.onClick(taskTag.tag.id)
    },
    [taskTag.tag.id, props],
  )

  return (
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      {taskTag.tag.name}
    </SearchMenuListItem>
  )
})
TagItem.displayName = 'TagItem'
