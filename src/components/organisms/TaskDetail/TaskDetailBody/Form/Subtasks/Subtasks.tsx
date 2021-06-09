import React, { memo, useCallback } from 'react'
import { useSubtasksByTask } from 'src/store/entities/subtasks'
import { Row, Label } from '../Row'
import { AddSubtaskButton } from './AddSubtaskButton'
import { TasksName } from './TasksName'

type Props = {
  taskId: string
}

export const Subtasks: React.FC<Props> = memo<Props>((props) => {
  const { subtaskIds, addSubtask } = useSubtasksByTask(props.taskId)

  const handleAddSubtask = useCallback(() => {
    addSubtask()
  }, [addSubtask])

  return (
    <Row flexDirection="column" alignItems="flex-start">
      {subtaskIds.length > 0 && (
        <>
          <Label>Subtasks</Label>
          {subtaskIds.map((s) => (
            <TasksName subtaskId={s} key={s} />
          ))}
        </>
      )}
      <AddSubtaskButton onClick={handleAddSubtask} />
    </Row>
  )
})
