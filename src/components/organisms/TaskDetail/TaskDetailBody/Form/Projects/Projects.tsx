import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { useProjectTaskSectionsByProjectIdsQuery } from 'src/hooks/queries/entities'
import {
  useProjectIdsByTaskId,
  useProjectTaskCommand,
  useProjectTaskIdsByTaskId,
} from 'src/store/entities/projectTask'
import { Row, Label, Content } from '../Row'
import { Selected } from './Selected'
import { UnSelected } from './UnSelected'

type Props = {
  taskId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { projectIds } = useProjectIdsByTaskId(taskId)
  const { projectTaskIds } = useProjectTaskIdsByTaskId(taskId)
  const { setProjectTask, deleteProjectTask } = useProjectTaskCommand()
  const hasProject = projectIds.length > 0

  useProjectTaskSectionsByProjectIdsQuery(projectIds)

  const handleChange = useCallback(
    async (input: { projectTaskId: string; projectTaskSectionId: string }) => {
      await setProjectTask({
        id: input.projectTaskId,
        projectTaskSectionId: input.projectTaskSectionId,
      })
    },
    [setProjectTask],
  )

  const handleDelete = useCallback(
    async (projectTaskId: string) => {
      await deleteProjectTask({ id: projectTaskId })
    },
    [deleteProjectTask],
  )

  return (
    <Row>
      <Label>Projects</Label>
      <Content>
        {hasProject ? (
          <Flex flexDirection="column">
            {projectTaskIds.map((id) => (
              <Selected
                taskId={taskId}
                projectTaskId={id}
                key={id}
                onChange={handleChange}
                onDelete={handleDelete}
              />
            ))}
          </Flex>
        ) : (
          <UnSelected taskId={taskId} />
        )}
      </Content>
    </Row>
  )
})
Projects.displayName = 'Projects'
