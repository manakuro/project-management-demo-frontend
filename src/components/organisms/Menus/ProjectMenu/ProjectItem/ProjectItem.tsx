import React, { memo, useCallback } from 'react'
import { ListItem } from '../ListItem'
import { useProject } from 'src/store/entities/projects'

type Props = {
  onClick: (project: string) => void
  projectId: string
  index: number
}

export const ProjectItem: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId)
  const handleClick = useCallback(() => {
    props.onClick(props.projectId)
  }, [props])

  return (
    <ListItem index={props.index} onClick={handleClick}>
      {project.name}
    </ListItem>
  )
})
