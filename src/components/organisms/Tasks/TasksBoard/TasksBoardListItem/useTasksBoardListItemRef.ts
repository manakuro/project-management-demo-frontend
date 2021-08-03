import { useCallback } from 'react'

const CLASS = 'tasks-board-list-item'
export const useTasksBoardListItemRef = () => {
  const getTasksBoardListItemElements = useCallback(() => {
    return Array.from(document.querySelectorAll(`.${CLASS}`))
  }, [])

  return {
    className: CLASS,
    getTasksBoardListItemElements,
  }
}
