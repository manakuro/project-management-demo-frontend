import React, { memo, useCallback } from 'react'
import { ListItem } from '../ListItem'
import { Project } from 'src/store/entities/projects'

type Props = {
  onClick: (project: string) => void
  project: Project
  index: number
}

export const ProjectItem: React.FC<Props> = memo<Props>((props) => {
  const { project } = props
  const handleClick = useCallback(() => {
    props.onClick(project.id)
  }, [project.id, props])

  return (
    <ListItem index={props.index} onClick={handleClick}>
      {project.name}
    </ListItem>
  )
})
