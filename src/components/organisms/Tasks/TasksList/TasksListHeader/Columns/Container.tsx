import React, { memo, useCallback, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTaskColumn } from 'src/store/entities/taskColumns'

type Props = {
  taskColumnId: string
  isFirst?: boolean
}

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId, isFirst } = props
  const { taskColumn, setTaskColumn } = useTaskColumn(taskColumnId)
  const minW = useMemo(() => (isFirst ? 400 : 120), [isFirst])
  const style = useMemo<FlexProps>(() => {
    return {
      ...(isFirst
        ? {
            pl: 0,
            borderLeft: 'none',
          }
        : {}),
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
      minW={`${minW}px`}
      resizedMinW={minW}
      onChangeSize={handleChangeSize}
    >
      {taskColumn.name}
    </TasksListCell>
  )
})
Container.displayName = 'Container'
