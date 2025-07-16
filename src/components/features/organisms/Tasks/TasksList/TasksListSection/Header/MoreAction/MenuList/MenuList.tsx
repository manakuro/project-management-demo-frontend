import { memo, useCallback, useMemo } from 'react'
import { useDeleteTaskSectionModal } from 'src/components/features/organisms/Modals'
import { useTasksListSectionContext } from 'src/components/features/organisms/Tasks/TasksList/TasksListSection/Provider'
import {
  useHasTasksByTaskSectionId,
  useTasksCanDeleteTaskSection,
  useTasksTaskSectionCommand,
} from 'src/components/features/organisms/Tasks/hooks'
import { Tooltip } from 'src/components/ui/molecules'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/ui/organisms/Menu'

export const MenuList = memo(function MenuList() {
  const { setModalState, onOpen } = useDeleteTaskSectionModal()
  const { deleteTaskSection } = useTasksTaskSectionCommand()
  const { onFocusInput, taskSectionId } = useTasksListSectionContext()
  const { hasTasks } = useHasTasksByTaskSectionId(taskSectionId)
  const { canDeleteTaskSection, message } =
    useTasksCanDeleteTaskSection(taskSectionId)

  const deleteSectionDisabled = useMemo(
    () => !canDeleteTaskSection,
    [canDeleteTaskSection],
  )

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
    })
    onOpen()
  }, [deleteTaskSection, hasTasks, onOpen, setModalState, taskSectionId])

  return (
    <AtomsMenuList>
      <MenuItem onClick={handleRenameSection}>Rename section</MenuItem>
      {deleteSectionDisabled ? (
        <Tooltip
          hasArrow
          label={message}
          aria-label={message}
          size="md"
          withIcon
        >
          <MenuItem isDisabled>Delete section</MenuItem>
        </Tooltip>
      ) : (
        <MenuItem onClick={handleDeleteSection} color="alert">
          Delete section
        </MenuItem>
      )}
    </AtomsMenuList>
  )
})
MenuList.displayName = 'MenuList'
