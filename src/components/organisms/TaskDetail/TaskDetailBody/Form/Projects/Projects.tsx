import React, { memo } from 'react'
import { useProjectIdsByTaskId } from 'src/store/entities/projectTask'
import { Row, Label, Content } from '../Row'
import { Selected } from './Selected'
import { UnSelected } from './UnSelected'

type Props = {
  taskId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { projectIds } = useProjectIdsByTaskId(taskId)
  const hasProject = projectIds.length > 0

  return (
    <Row>
      <Label>Projects</Label>
      <Content>
        {hasProject ? (
          <Selected taskId={taskId} />
        ) : (
          <UnSelected taskId={taskId} />
        )}
      </Content>
    </Row>
  )
})
Projects.displayName = 'Projects'
