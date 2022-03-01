import React, { memo, useCallback } from 'react'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/organisms/Menu'
import { useDeleteTaskSectionModal } from 'src/components/organisms/Modals'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'
import {
  useHasTasksByTaskSectionId,
  useTasksTaskSectionCommand,
} from 'src/components/organisms/Tasks/hooks'

type Props = {}

export const MenuList: React.FC<Props> = memo(() => {
  const { setModalState, onOpen } = useDeleteTaskSectionModal()
  const {
    deleteTaskSectionAndDeleteTasks,
    deleteTaskSectionAndKeepTasks,
    deleteTaskSection,
  } = useTasksTaskSectionCommand()
  const { onFocusInput, taskSectionId } = useTasksListSectionContext()
  const { hasTasks } = useHasTasksByTaskSectionId(taskSectionId)

  const handleRenameSection = useCallback(() => {
    onFocusInput()
  }, [onFocusInput])

  // TODO: Fix unmounted error
  const handleDeleteSection = useCallback(async () => {
    if (!hasTasks) {
      await deleteTaskSection(taskSectionId)
      return
    }

    setModalState({
      taskSectionId,
      deleteTaskSectionAndDeleteTasks,
      deleteTaskSectionAndKeepTasks,
    })
    onOpen()
  }, [
    deleteTaskSection,
    deleteTaskSectionAndDeleteTasks,
    deleteTaskSectionAndKeepTasks,
    hasTasks,
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
