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
  const subtaskIds = useMemo(
    () => subtasksByTaskId(props.taskId).map((s) => s.id),
    [props.taskId, subtasksByTaskId],
  )

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
      <AddSubtaskButton />
    </Row>
  )
})
