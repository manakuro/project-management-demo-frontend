import React, { memo, useCallback, useMemo } from 'react'
import { Box, Icon, IconButton, PortalManager } from 'src/components/atoms'
import { Menu, MenuButton } from 'src/components/organisms/Menu'
import {
  useTasksTaskColumn,
  useTasksTaskColumnIds,
} from 'src/components/organisms/Tasks/hooks'
import { MenuList } from './MenuList'

type Props = {
  onClosed?: () => void
  onOpened?: () => void
  onSort?: () => void
  tasksTaskColumnId: string
}

export const MoreAction: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props
  const { tasksTaskColumnIds } = useTasksTaskColumnIds()
  const { setOrderTaskColumn, canMoveLeft, canMoveRight, setTasksTaskColumn } =
    useTasksTaskColumn(tasksTaskColumnId)

  const handleHideColumn = useCallback(async () => {
    await setTasksTaskColumn({ disabled: true })
  }, [setTasksTaskColumn])

  const handleMoveRight = useCallback(async () => {
    const currentIndex = tasksTaskColumnIds.indexOf(tasksTaskColumnId)
    await setOrderTaskColumn(currentIndex, currentIndex + 1)
  }, [setOrderTaskColumn, tasksTaskColumnId, tasksTaskColumnIds])

  const handleMoveLeft = useCallback(async () => {
    const currentIndex = tasksTaskColumnIds.indexOf(tasksTaskColumnId)
    await setOrderTaskColumn(currentIndex, currentIndex - 1)
  }, [setOrderTaskColumn, tasksTaskColumnId, tasksTaskColumnIds])

  const disabledMoveLeft = useMemo(
    () => !canMoveLeft(tasksTaskColumnId),
    [canMoveLeft, tasksTaskColumnId],
  )

  const disabledMoveRight = useMemo(
    () => !canMoveRight(tasksTaskColumnId),
    [canMoveRight, tasksTaskColumnId],
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
