import { useCallback } from 'react'

export const useTasks = () => {
  const addTask = useCallback(() => {}, [])
  const addSection = useCallback(() => {}, [])

  return {
    addTask,
    addSection,
  }
}
