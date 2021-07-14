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
export const initialUseTaskSection = (): Result => ({
  taskSectionIds: [],
  taskIds: [],
  addTaskSection: () => '',
  addedTaskSectionId: '',
  setAddedTaskSectionId: () => {},
  resetAddedTaskSectionId: () => {},
})

export type CreateUseTaskSectionResult = ReturnType<typeof createUseTaskSection>

export const createUseTaskSection = (props: TasksProviderProps) => {
  return function useTaskSection(): Result {
    const { taskSectionIds, taskIds } = useMyTasks()
    const { addMyTaskSection } = useMyTaskCommands()
    const [addedTaskSectionId, setAddedTaskSectionId] = useState('')

    const resetAddedTaskSectionId = useCallback(() => {
      setAddedTaskSectionId('')
    }, [])

    if (props.isMyTasksPage) {
      return {
        taskSectionIds,
        taskIds,
        addTaskSection: addMyTaskSection,
        resetAddedTaskSectionId,
        addedTaskSectionId,
        setAddedTaskSectionId,
      }
    }

    return initialUseTaskSection()
  }
}
