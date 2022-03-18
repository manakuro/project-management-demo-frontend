import React, { memo, useCallback } from 'react'
import { Box, Button, Flex, Icon, Stack } from 'src/components/atoms'
import { useDisclosure } from 'src/shared/chakra'
import { useProjectTask } from 'src/store/entities/projectTask'
import { Input } from '../Input'
import { ProjectButton } from './ProjectButton'
import { Section } from './Section'

type Props = {
  taskId: string
  projectTaskId: string
  onChange: (input: {
    projectTaskId: string
    projectTaskSectionId: string
  }) => void
  onDelete: (projectTaskId: string) => void
}

export const Selected: React.FC<Props> = memo<Props>((props) => {
  const { taskId, projectTaskId, onChange, onDelete } = props
  const { projectTask } = useProjectTask(projectTaskId)
  const inputDisclosure = useDisclosure()

  const handleDelete = useCallback(() => {
    onDelete(projectTaskId)
  }, [onDelete, projectTaskId])

  return (
    <Flex flexDirection="column">
      <Stack
        spacing={1}
        direction="row"
        display="flex"
        alignItems="center"
        mt={1}
        mb={2}
      >
        <ProjectButton projectId={projectTask.projectId} />
        <Section
          taskId={taskId}
          projectTaskId={projectTaskId}
          onChange={onChange}
        />
        <Button
          as={Box}
          variant="ghost"
          size="xs"
          cursor="pointer"
          onClick={handleDelete}
        >
          <Icon icon="x" color="text.muted" />
        </Button>
        <Button
          as={Box}
          variant="ghost"
          size="xs"
          cursor="pointer"
          onClick={inputDisclosure.onOpen}
        >
          <Icon icon="plus" color="text.muted" />
        </Button>
      </Stack>
      {inputDisclosure.isOpen && (
        <Flex flex={1}>
          <Input onClose={inputDisclosure.onClose} taskId={taskId} />
        </Flex>
      )}
    </Flex>
  )
})
Selected.displayName = 'Selected'
