import React, { memo, useCallback } from 'react'
import { SearchMenuListItem } from 'src/components/features/organisms/Menus/SearchMenu'
import { Project } from 'src/store/entities/project'

type Props = {
  onClick: (project: string) => void
  project: Project
  index: number
}

export const ProjectItem: React.FC<Props> = memo<Props>((props) => {
  const { project } = props

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      props.onClick(project.id)
    },
    [project.id, props],
  )

  return (
    <SearchMenuListItem index={props.index} onClick={handleClick}>
      {project.name}
    </SearchMenuListItem>
  )
})
ProjectItem.displayName = 'ProjectItem'
