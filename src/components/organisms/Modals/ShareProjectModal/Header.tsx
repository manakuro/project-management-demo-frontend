import React, { memo } from 'react'
import { ModalHeader } from 'src/components/organisms/Modal'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
}

export const Header: React.VFC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId)

  return <ModalHeader>Share {project.name}</ModalHeader>
})
Header.displayName = 'Header'
