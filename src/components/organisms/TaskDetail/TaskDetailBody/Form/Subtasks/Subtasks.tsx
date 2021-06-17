import React, { memo, useCallback } from 'react'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { Row, Label } from '../Row'
import { AddSubtaskButton } from './AddSubtaskButton'
import { TasksName } from './TasksName'

type Props = {
  taskParentId: string
}

export const Subtasks: React.FC<Props> = memo<Props>((props) => {
  const { taskIds, addTask } = useTaskIdsByTaskParentId(props.taskParentId)

  const handleAddSubtask = useCallback(async () => {
    await addTask()
  }, [addTask])

  return (
    <Row flexDirection="column" alignItems="flex-start">
      {taskIds.length > 0 && (
        <>
          <Label>Subtasks</Label>
          {taskIds.map((id) => (
            <TasksName taskId={id} key={id} />
          ))}
        </>
      )}
      <AddSubtaskButton onClick={handleAddSubtask} />
    </Row>
  )
})
