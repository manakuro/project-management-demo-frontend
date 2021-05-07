import React, { memo, useCallback } from 'react'
import { Row, Label } from '../Row'
import { useSubtasksByTask } from 'src/store/subtasks'
import { AddSubtaskButton } from './AddSubtaskButton'
import { TasksName } from './TasksName'

type Props = {
  taskId: string
}

export const Subtasks: React.FC<Props> = memo<Props>((props) => {
  const { subtaskIds } = useSubtasksByTask(props.taskId)

  const handleAddSubtask = useCallback(() => {
    console.log('handleAddSubtask!')
  }, [])

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