import React, { memo, useMemo } from 'react'
import { Row, Label } from '../Row'
import { useSubtasks } from 'src/store/subtasks'
import { AddSubtaskButton } from './AddSubtaskButton'
import { TasksName } from './TasksName'

type Props = {
  taskId: string
}

export const Subtasks: React.FC<Props> = memo<Props>((props) => {
  const { subtasksByTaskId } = useSubtasks()
  const subtasks = useMemo(() => subtasksByTaskId(props.taskId), [
    props.taskId,
    subtasksByTaskId,
  ])

  console.log('subtasks: ', subtasks)

  return (
    <Row flexDirection="column" alignItems="flex-start">
      {subtasks.length > 0 && (
        <>
          <Label>Subtasks</Label>
          <TasksName />
        </>
      )}
      <AddSubtaskButton />
    </Row>
  )
})
