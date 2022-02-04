import React, { memo } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useHover } from 'src/hooks/useHover'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectIdsByTaskId } from 'src/store/entities/projectTask'
import { useTask } from 'src/store/entities/task'
import { CheckIcon } from './CheckIcon'
import { Container } from './Container'
import { Input } from './Input'
import { Subtask } from './Subtask'
import { TaskName } from './TaskName'
import { useListItem } from './useListItem'

type Props = {
  taskId: string
} & FlexProps

export const ListItemForProjectsPage: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { task } = useTask(taskId)
  const { ref, isHovering } = useHover()
  const { onOpenTaskDetail } = useListItem({ taskId })
  const { projectId } = useProjectsProjectId()
  const { projectIds } = useProjectIdsByTaskId(props.taskId, {
    excluded: [projectId],
  })

  if (task.isNew) {
    return <Input taskId={taskId} />
  }

  return (
    <Container
      taskId={taskId}
      ref={ref}
      onClick={onOpenTaskDetail}
      projectId={projectIds[0]}
    >
      <CheckIcon
        taskId={taskId}
        isHovering={isHovering}
        projectId={projectIds[0]}
      />
      {task.assigneeId && (
        <TeammateAvatar
          teammateId={task.assigneeId}
          showProfile={false}
          ml={1}
          size="xs"
        />
      )}
      <TaskName taskId={taskId} />
      <Stack direction="row" spacing={1} ml={1} mr="auto">
        <Subtask taskId={taskId} />
      </Stack>
    </Container>
  )
})
ListItemForProjectsPage.displayName = 'ListItemForProjectsPage'
