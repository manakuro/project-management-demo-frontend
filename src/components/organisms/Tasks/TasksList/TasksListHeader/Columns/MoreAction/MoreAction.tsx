import React, { memo, useCallback, useMemo } from 'react'
import { Box, Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import { useTaskColumnFromTasks } from 'src/components/organisms/Tasks/hooks'
import { useTaskColumn } from 'src/store/entities/taskColumns'
import { MenuList } from './MenuList'

type Props = {
  onClosed?: () => void
  onOpened?: () => void
  onSort?: () => void
  taskColumnId: string
}

export const MoreAction: React.FC<Props> = memo<Props>((props) => {
  const { setOrderTaskColumn, taskColumnIds, canMoveLeft, canMoveRight } =
    useTaskColumnFromTasks()
  const { taskColumn, setTaskColumn } = useTaskColumn(props.taskColumnId)
  const handleHideColumn = useCallback(async () => {
    await setTaskColumn({ disabled: true })
  }, [setTaskColumn])

  const handleMoveRight = useCallback(async () => {
    const currentIndex = taskColumnIds.indexOf(taskColumn.id)
    await setOrderTaskColumn(currentIndex, currentIndex + 1)
  }, [setOrderTaskColumn, taskColumn.id, taskColumnIds])

  const handleMoveLeft = useCallback(async () => {
    const currentIndex = taskColumnIds.indexOf(taskColumn.id)
    await setOrderTaskColumn(currentIndex, currentIndex - 1)
  }, [setOrderTaskColumn, taskColumn.id, taskColumnIds])

  const disabledMoveLeft = useMemo<boolean>(
    () => !canMoveLeft(props.taskColumnId),
    [canMoveLeft, props.taskColumnId],
  )

  const disabledMoveRight = useMemo<boolean>(
    () => !canMoveRight(props.taskColumnId),
    [canMoveRight, props.taskColumnId],
  )

  return (
    <PortalManager zIndex={1500}>
      <Box>
        <Menu
          placement="bottom-start"
          isLazy
          onOpen={props.onOpened}
          onClose={props.onClosed}
        >
          <MenuButton
            aria-label="More actions"
            as={IconButton}
            icon={<Icon icon="chevronDown" color="text.muted" />}
            variant="ghost"
            size="sm"
          />
          <MenuList
            onSort={props.onSort}
            onMoveRight={handleMoveRight}
            onMoveLeft={handleMoveLeft}
            onHideColumn={handleHideColumn}
            disabledMoveLeft={disabledMoveLeft}
            disabledMoveRight={disabledMoveRight}
          />
        </Menu>
      </Box>
    </PortalManager>
  )
})
MoreAction.displayName = 'MoreAction'
