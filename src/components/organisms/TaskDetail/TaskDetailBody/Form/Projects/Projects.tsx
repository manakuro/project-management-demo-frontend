import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { Input } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Projects/Input'
import { useTaskDetailProjectsInput } from 'src/components/organisms/TaskDetail/hooks'
import { useProjectTaskSectionsByProjectIdsQuery } from 'src/hooks/queries/entities'
import {
  useProjectIdsByTaskId,
  useProjectTaskCommand,
  useProjectTaskIdsByTaskId,
} from 'src/store/entities/projectTask'
import { useTask } from 'src/store/entities/task'
import { Row, Label, Content } from '../Row'
import { Selected } from './Selected'
import { UnSelected } from './UnSelected'

type Props = {
  taskId: string
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { isSubtask } = useTask(taskId)
  const { projectIds } = useProjectIdsByTaskId(taskId)
  const { projectTaskIds } = useProjectTaskIdsByTaskId(taskId)
  const { setProjectTask, deleteProjectTask } = useProjectTaskCommand()
  const hasProject = projectIds.length > 0
  const inputDisclosure = useTaskDetailProjectsInput()

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

  if (isSubtask) return null

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
                onClick={inputDisclosure.onOpen}
              />
            ))}
            {inputDisclosure.isOpen && (
              <Flex flex={1}>
                <Input onClose={inputDisclosure.onClose} taskId={taskId} />
              </Flex>
            )}
          </Flex>
        ) : (
          <UnSelected
            taskId={taskId}
            onClick={inputDisclosure.onOpen}
            onClose={inputDisclosure.onClose}
            isOpen={inputDisclosure.isOpen}
          />
        )}
      </Content>
    </Row>
  )
})
Projects.displayName = 'Projects'
