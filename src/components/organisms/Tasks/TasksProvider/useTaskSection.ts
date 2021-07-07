import React, { useCallback, useState } from 'react'
import { useMyTaskCommands, useMyTasks } from 'src/store/app/myTasks'
import { TasksProviderProps } from './TasksProvider'

type Result = {
  taskSectionIds: string[]
  taskIds: string[]
  addTaskSection: () => string
  addedTaskSectionId: string
  setAddedTaskSectionId: React.Dispatch<React.SetStateAction<string>>
  resetAddedTaskSectionId: () => void
}
export type UseTaskSectionResult = Result
export const initialUseTaskSectionIds = (): Result => ({
  taskSectionIds: [],
  taskIds: [],
  addTaskSection: () => '',
  addedTaskSectionId: '',
  setAddedTaskSectionId: () => {},
  resetAddedTaskSectionId: () => {},
})
export const useTaskSection = (props: TasksProviderProps): Result => {
  const { taskSectionIds, taskIds } = useMyTasks()
  const { addMyTaskSection } = useMyTaskCommands()
  const [addedTaskSectionId, setAddedTaskSectionId] = useState('')

  const resetAddedTaskSectionId = useCallback(() => {
    setAddedTaskSectionId('')
  }, [])

  if (props.myTasks) {
    return {
      taskSectionIds,
      taskIds,
      addTaskSection: addMyTaskSection,
      resetAddedTaskSectionId,
      addedTaskSectionId,
      setAddedTaskSectionId,
    }
  }

  return initialUseTaskSectionIds()
}
