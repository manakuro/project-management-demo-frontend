import React, { memo } from 'react'
import { ModalHeader } from 'src/components/ui/organisms/Modal'
import { useProject } from 'src/store/entities/project'

type Props = {
  projectId: string
}

export const Header: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId)

  return <ModalHeader>Share {project.name}</ModalHeader>
})
Header.displayName = 'Header'
