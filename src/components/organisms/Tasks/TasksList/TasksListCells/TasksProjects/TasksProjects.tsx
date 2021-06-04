import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTask } from 'src/store/entities/tasks'
import { ProjectChip } from 'src/components/molecules'

type Props = FlexProps & {
  taskId: string
}

export const TasksProjects: React.VFC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)

  return (
    <TasksListCell w="12%" hover cursor="pointer">
      <ProjectChip projectId={task.projectId} />
    </TasksListCell>
  )
})
TasksProjects.displayName = 'TasksProjects'
