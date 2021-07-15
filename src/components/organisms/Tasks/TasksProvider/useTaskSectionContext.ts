import React, { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useMyTaskCommands, useMyTasks } from 'src/store/app/myTasks'
import { useTasksContext } from './TasksProvider'

const FILE_NAME = 'src/components/organisms/Tasks/TasksProvider/useTaskSection'

type Result = {
  taskSectionIds: string[]
  taskIds: string[]
  addTaskSection: () => string
  addedTaskSectionId: string
  setAddedTaskSectionId: React.Dispatch<React.SetStateAction<string>>
  resetAddedTaskSectionId: () => void
}
export const initialUseTaskSection = (): Result => ({
  taskSectionIds: [],
  taskIds: [],
  addTaskSection: () => '',
  addedTaskSectionId: '',
  setAddedTaskSectionId: () => {},
  resetAddedTaskSectionId: () => {},
})

const addedTaskSectionIdState = atom<string>({
  key: `${FILE_NAME}/addedTaskSectionIdState`,
  default: '',
})

export const useTaskSectionContext = () => {
  const { isMyTasksPage } = useTasksContext()

  const myTasks = useMyTasks()
  const myTaskCommands = useMyTaskCommands()
  const [addedTaskSectionId, setAddedTaskSectionId] = useRecoilState(
    addedTaskSectionIdState,
  )

  const resetAddedTaskSectionId = useCallback(() => {
    setAddedTaskSectionId('')
  }, [setAddedTaskSectionId])

  if (isMyTasksPage) {
    return {
      taskSectionIds: myTasks.taskSectionIds,
      taskIds: myTasks.taskIds,
      addTaskSection: myTaskCommands.addMyTaskSection,
      resetAddedTaskSectionId,
      addedTaskSectionId,
      setAddedTaskSectionId,
    }
  }

  return initialUseTaskSection()
}
