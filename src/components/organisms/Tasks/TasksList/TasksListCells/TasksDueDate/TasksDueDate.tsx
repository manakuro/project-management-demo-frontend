import React, { memo, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTask } from 'src/store/entities/tasks'

type Props = FlexProps & {
  taskId: string
}

export const TasksDueDate: React.VFC<Props> = memo<Props>((props) => {
  const { task } = useTask(props.taskId)
  const hasDueDate = useMemo(() => !!task.dueDate, [task.dueDate])
  console.log('hasDueDate: ', hasDueDate)

  return <TasksListCell w="12%" hover></TasksListCell>
})
TasksDueDate.displayName = 'TasksDueDate'
