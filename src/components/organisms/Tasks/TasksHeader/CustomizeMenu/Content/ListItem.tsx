import React, { memo, useCallback, useMemo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box } from 'src/components/atoms'
import { CustomField } from 'src/components/molecules'
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal'
import { useTaskColumn } from 'src/store/entities/taskColumns'

type Props = {
  taskColumnId: string
  index: number
}

export const ListItem: React.VFC<Props> = memo<Props>((props) => {
  const { taskColumn, setTaskColumn } = useTaskColumn(props.taskColumnId)
  const renderDraggable = useDraggableInPortal()

  const isChecked = useMemo(() => !taskColumn.disabled, [taskColumn.disabled])
  const handleChange = useCallback(async () => {
    await setTaskColumn({ disabled: !taskColumn.disabled })
  }, [setTaskColumn, taskColumn.disabled])

  if (!taskColumn.customizable) return null

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
