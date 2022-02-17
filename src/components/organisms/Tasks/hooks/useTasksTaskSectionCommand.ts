import React, { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useMyTasksTaskSectionCommand } from 'src/store/app/myTasks/taskSections'
import { useProjectsTaskSectionCommand } from 'src/store/app/projects/taskSections'
import { useTasksContext } from '../TasksProvider'

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksProvider/useTaskSection/${str}`

type Result = {
  addTaskSection: () => Promise<string>
  addedTaskSectionId: string
  setAddedTaskSectionId: React.Dispatch<React.SetStateAction<string>>
  resetAddedTaskSectionId: () => void
}

const addedTaskSectionIdState = atom<string>({
  key: key('addedTaskSectionIdState'),
  default: '',
})

export const useTasksTaskSectionCommand = (): Result => {
  const { isMyTasksPage } = useTasksContext()

  const myTasks = useMyTasksTaskSectionCommand()
  const projects = useProjectsTaskSectionCommand()
  const [addedTaskSectionId, setAddedTaskSectionId] = useRecoilState(
    addedTaskSectionIdState,
  )

  const resetAddedTaskSectionId = useCallback(() => {
    setAddedTaskSectionId('')
  }, [setAddedTaskSectionId])

  if (isMyTasksPage) {
    return {
      addTaskSection: myTasks.addMyTaskSection,
      resetAddedTaskSectionId,
      addedTaskSectionId,
      setAddedTaskSectionId,
    }
  }

  return {
    addTaskSection: projects.addTaskSection,
    resetAddedTaskSectionId,
    addedTaskSectionId,
    setAddedTaskSectionId,
  }
}
