import React, { memo, useCallback, useMemo, useState } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTasksListHeaderContext } from 'src/components/organisms/Tasks/TasksList/TasksListHeader/Provider'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import { MoreAction } from './MoreAction'

type Props = {
  taskColumnId: string
  isFirst?: boolean
  clickable?: boolean
  containerStyle?: FlexProps
  menu?: boolean
  onSort?: () => void
  onMoveRight?: () => void
  onMoveLeft?: () => void
  onHideColumn?: () => void
} & FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const {
    taskColumnId,
    isFirst,
    clickable,
    containerStyle,
    onSort,
    onMoveRight,
    onMoveLeft,
    onHideColumn,
    ...rest
  } = props
  const { taskColumn, setTaskColumn } = useTaskColumn(taskColumnId)
  const { clickableHoverStyle } = useClickableHoverStyle()
  const { sortedStyle } = useTasksListHeaderContext()
  const minW = useMemo(() => (isFirst ? 400 : 120), [isFirst])
  const maxW = useMemo(() => (isFirst ? 800 : 280), [isFirst])
  const style = useMemo<FlexProps>(() => {
    return {
      ...(isFirst ? { pl: 0, borderLeft: 'none' } : {}),
      ...(clickable ? { cursor: 'pointer', ...clickableHoverStyle } : {}),
    }
  }, [clickable, clickableHoverStyle, isFirst])
  const { ref, isHovering } = useHover()

  const handleChangeSize = useCallback(
    async (size: string) => {
      await setTaskColumn({ width: size })
    },
    [setTaskColumn],
  )
  const handleHideColumn = useCallback(async () => {
    await setTaskColumn({ disabled: true })
  }, [setTaskColumn])

  const {
    showMoreActionIcon,
    onMoreActionOpened,
    onMoreActionClosed,
    stopPropagation,
  } = useMoreAction({ isHovering })

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
      ref={ref}
      {...style}
      {...sortedStyle}
      {...rest}
    >
      {taskColumn.name}
      {props.children}
      {showMoreActionIcon && (
        <Flex ml="auto" onClick={stopPropagation}>
          <MoreAction
            onOpened={onMoreActionOpened}
            onClosed={onMoreActionClosed}
            onSort={onSort}
            onMoveRight={onMoveRight}
            onMoveLeft={onMoveLeft}
            onHideColumn={handleHideColumn}
          />
        </Flex>
      )}
    </TasksListCell>
  )
})
Container.displayName = 'Container'

const useMoreAction = ({ isHovering }: { isHovering: boolean }) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])
  const [isMoreActionOpened, setIsMoreActionOpened] = useState(false)
  const showMoreActionIcon = useMemo<boolean>(() => {
    if (isHovering) return true
    if (isMoreActionOpened) return true
    return false
  }, [isHovering, isMoreActionOpened])

  const onMoreActionOpened = useCallback(() => {
    setIsMoreActionOpened(true)
  }, [])

  const onMoreActionClosed = useCallback(() => {
    setIsMoreActionOpened(false)
  }, [])

  return {
    stopPropagation,
    showMoreActionIcon,
    onMoreActionOpened,
    onMoreActionClosed,
  }
}
