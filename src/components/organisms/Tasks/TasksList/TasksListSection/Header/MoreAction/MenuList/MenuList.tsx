import React, { memo, useCallback } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'
import { useDeleteTaskSectionModal } from 'src/components/organisms/Modals'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'
import { useTasksTaskSectionCommand } from 'src/components/organisms/Tasks/hooks'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const { setModalState, onOpen } = useDeleteTaskSectionModal()
  const { deleteTaskSectionAndDeleteTasks, deleteTaskSectionAndKeepTasks } =
    useTasksTaskSectionCommand()
  const { onFocusInput, taskSectionId } = useTasksListSectionContext()

  const handleRenameSection = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  // TODO: Fix unmounted error
  const handleDeleteSection = useCallback(() => {
    setModalState({
      taskSectionId,
      deleteTaskSectionAndDeleteTasks,
      deleteTaskSectionAndKeepTasks,
    })
    onOpen()
  }, [
    deleteTaskSectionAndDeleteTasks,
    deleteTaskSectionAndKeepTasks,
    onOpen,
    setModalState,
    taskSectionId,
  ])

  return (
    <AtomsMenuList>
      <MenuItem onClick={handleRenameSection}>Rename section</MenuItem>
      <MenuItem onClick={handleDeleteSection} color="alert">
        Delete section
      </MenuItem>
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
