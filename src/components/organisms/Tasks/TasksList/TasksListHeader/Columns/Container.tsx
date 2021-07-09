import React, { memo, useCallback, useMemo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useClickableHoverStyle } from 'src/hooks'
import { ChakraProps } from 'src/shared/chakra'
import { useTaskColumn } from 'src/store/entities/taskColumns'

type Props = {
  taskColumnId: string
  isFirst?: boolean
  clickable?: boolean
  containerStyle?: FlexProps
} & FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const { taskColumnId, isFirst, clickable, containerStyle, ...rest } = props
  const { taskColumn, setTaskColumn } = useTaskColumn(taskColumnId)
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { isSorted } = useTasksContext()
  const sortedStyle = useMemo((): ChakraProps => {
    if (!isSorted('none')) return { borderBottom: 'none' }
    return {}
  }, [isSorted])
  const minW = useMemo(() => (isFirst ? 400 : 120), [isFirst])
  const maxW = useMemo(() => (isFirst ? 800 : 280), [isFirst])
  const style = useMemo<FlexProps>(() => {
    return {
      ...(isFirst
        ? {
            pl: 0,
            borderLeft: 'none',
          }
        : {}),
      ...(clickable
        ? {
            cursor: 'pointer',
            ...clickableHoverStyle,
          }
        : {}),
    }
  }, [clickable, clickableHoverStyle, isFirst])

  const handleChangeSize = useCallback(
    async (size: string) => {
      await setTaskColumn({ width: size })
    },
    [setTaskColumn],
  )

  return (
    <TasksListCell
      resizable
      resizedMinW={minW}
      resizedMaxW={maxW}
      onChangeSize={handleChangeSize}
      containerStyle={{
        w: taskColumn.width,
        minW: `${minW}px`,
        maxW: `${maxW}px`,
        ...containerStyle,
      }}
      {...style}
      {...sortedStyle}
      {...rest}
    >
      {taskColumn.name}
      {props.children}
    </TasksListCell>
  )
})
Container.displayName = 'Container'
