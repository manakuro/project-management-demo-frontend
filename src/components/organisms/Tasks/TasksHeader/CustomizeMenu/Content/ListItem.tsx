import { Draggable } from '@hello-pangea/dnd'
import React, { memo, useCallback, useMemo } from 'react'
import { Box } from 'src/components/atoms'
import { CustomField } from 'src/components/molecules'
import { useTasksTaskColumn } from 'src/components/organisms/Tasks/hooks'
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal'
import { useTaskColumn } from 'src/store/entities/taskColumn'

type Props = {
  tasksTaskColumnId: string
  index: number
}

export const ListItem: React.VFC<Props> = memo<Props>((props) => {
  const { tasksTaskColumn, setTasksTaskColumn } = useTasksTaskColumn(
    props.tasksTaskColumnId,
  )
  const renderDraggable = useDraggableInPortal()
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId)

  const isChecked = useMemo(
    () => !tasksTaskColumn.disabled,
    [tasksTaskColumn.disabled],
  )
  const handleChange = useCallback(async () => {
    await setTasksTaskColumn({ disabled: !tasksTaskColumn.disabled })
  }, [setTasksTaskColumn, tasksTaskColumn.disabled])

  if (!tasksTaskColumn.customizable) return null

  return (
    <Draggable
      key={taskColumn.name}
      draggableId={taskColumn.name}
      index={props.index}
    >
      {renderDraggable((provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          mb={3}
        >
          <CustomField
            label={taskColumn.name}
            isChecked={isChecked}
            onChange={handleChange}
          />
        </Box>
      ))}
    </Draggable>
  )
})
ListItem.displayName = 'ListItem'
