import type React from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell'
import { useTasksListHeaderContext } from 'src/components/features/organisms/Tasks/TasksList/TasksListHeader/Provider'
import { useTasksTaskColumn } from 'src/components/features/organisms/Tasks/hooks'
import { Flex, type FlexProps } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { useTaskColumn } from 'src/store/entities/taskColumn'
import { MoreAction } from './MoreAction'

type Props = {
  tasksTaskColumnId: string
  isFirst?: boolean
  clickable?: boolean
  containerStyle?: FlexProps
  menu?: boolean
  onSort?: () => void
} & FlexProps

export const Container: React.FC<Props> = memo<Props>((props) => {
  const {
    tasksTaskColumnId,
    isFirst,
    clickable,
    containerStyle,
    onSort,
    menu,
    ...rest
  } = props
  const { tasksTaskColumn, setTasksTaskColumn } =
    useTasksTaskColumn(tasksTaskColumnId)
  const { taskColumn } = useTaskColumn(tasksTaskColumn.taskColumnId)
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
      await setTasksTaskColumn({ width: size })
    },
    [setTasksTaskColumn],
  )

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
        w: tasksTaskColumn.width,
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
      {menu && showMoreActionIcon && (
        <Flex ml="auto" onClick={stopPropagation}>
          <MoreAction
            onOpened={onMoreActionOpened}
            onClosed={onMoreActionClosed}
            onSort={onSort}
            tasksTaskColumnId={tasksTaskColumnId}
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
