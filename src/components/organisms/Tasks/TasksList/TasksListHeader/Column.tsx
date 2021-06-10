import React, { memo, useCallback, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTaskColumn } from 'src/store/entities/taskColumns'

type Props = {
  taskColumnId: string
  isFirst?: boolean
}

export const Column: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId, isFirst } = props
  const { taskColumn, setTaskColumn } = useTaskColumn(taskColumnId)
  const style = useMemo<FlexProps>(() => {
    return {
      ...(isFirst
        ? {
            minW: '400px',
            pl: 0,
            borderLeft: 'none',
          }
        : {
            minW: '120px',
          }),
    }
  }, [isFirst])

  const handleChangeSize = useCallback(
    async (size: string) => {
      await setTaskColumn({ width: size })
    },
    [setTaskColumn],
  )

  return (
    <TasksListCell
      resizable
      w={taskColumn.width}
      {...style}
      onChangeSize={handleChangeSize}
    >
      {taskColumn.name}
    </TasksListCell>
  )
})
Column.displayName = 'Column'
