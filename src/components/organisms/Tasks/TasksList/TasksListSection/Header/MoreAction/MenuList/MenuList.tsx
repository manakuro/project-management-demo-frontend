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
  const { deleteTaskSectionAndDeleteTask, deleteTaskSectionAndKeepTask } =
    useTasksTaskSectionCommand()
  const { onFocusInput, taskSectionId } = useTasksListSectionContext()

  const handleRenameSection = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  const handleDeleteSection = useCallback(() => {
    setModalState({
      taskSectionId,
      deleteTaskSectionAndDeleteTask,
      deleteTaskSectionAndKeepTask,
    })
    onOpen()
  }, [
    deleteTaskSectionAndDeleteTask,
    deleteTaskSectionAndKeepTask,
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
