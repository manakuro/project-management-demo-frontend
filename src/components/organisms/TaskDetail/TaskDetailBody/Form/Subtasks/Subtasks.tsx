import React, { memo, useCallback } from 'react'
import { useTasksSubTask } from 'src/components/organisms/Tasks/hooks'
import { useSubtaskIds } from 'src/store/entities/task'
import { Row, Label } from '../Row'
import { AddSubtaskButton } from './AddSubtaskButton'
import { TasksName } from './TasksName'

type Props = {
  taskParentId: string
}
export const SUBTASK_LIST_CONTAINER_ID = 'SUBTASK_LIST_CONTAINER_ID'

export const Subtasks: React.FC<Props> = memo<Props>((props) => {
  const { taskIds } = useSubtaskIds(props.taskParentId)
  const { addTask } = useTasksSubTask()

  const handleAddSubtask = useCallback(async () => {
    await addTask({ taskParentId: props.taskParentId })
  }, [addTask, props.taskParentId])

  return (
    <Row
      flexDirection="column"
      alignItems="flex-start"
      id={SUBTASK_LIST_CONTAINER_ID}
    >
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
Subtasks.displayName = 'Subtasks'
