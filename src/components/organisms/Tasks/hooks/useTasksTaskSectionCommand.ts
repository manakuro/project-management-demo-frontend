import React, { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useMyTasksTaskSectionCommand } from 'src/store/app/myTasks/taskSections'
import { useTasksContext } from '../TasksProvider'

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksProvider/useTaskSection/${str}`

type Result = {
  addTaskSection: () => string
  addedTaskSectionId: string
  setAddedTaskSectionId: React.Dispatch<React.SetStateAction<string>>
  resetAddedTaskSectionId: () => void
}
export const initialUseTaskSection = (): Result => ({
  addTaskSection: () => '',
  addedTaskSectionId: '',
  setAddedTaskSectionId: () => {},
  resetAddedTaskSectionId: () => {},
})

const addedTaskSectionIdState = atom<string>({
  key: key('addedTaskSectionIdState'),
  default: '',
})

export const useTasksTaskSectionCommand = () => {
  const { isMyTasksPage } = useTasksContext()

  const useMyTasksTaskSectionCommandResult = useMyTasksTaskSectionCommand()
  const [addedTaskSectionId, setAddedTaskSectionId] = useRecoilState(
    addedTaskSectionIdState,
  )

  const resetAddedTaskSectionId = useCallback(() => {
    setAddedTaskSectionId('')
  }, [setAddedTaskSectionId])

  if (isMyTasksPage) {
    return {
      addTaskSection: useMyTasksTaskSectionCommandResult.addMyTaskSection,
      resetAddedTaskSectionId,
      addedTaskSectionId,
      setAddedTaskSectionId,
    }
  }

  return initialUseTaskSection()
}
