import { useCallback, useMemo, useState } from 'react'
import { useTasksNameContext } from 'src/components/organisms/Tasks/TasksList/TasksListCells'

export type UseAssignee = {
  onAssigneeOpened: () => void
  onAssigneeClosed: () => void
  assigneeFocused: boolean
  showIcon: boolean
}
export const useAssignee = (): UseAssignee => {
  const { isHovering } = useTasksNameContext()
  const [focused, setFocused] = useState(false)

  const onAssigneeOpened = useCallback(() => {
    setFocused(true)
  }, [])

  const onAssigneeClosed = useCallback(() => {
    setFocused(false)
  }, [])

  const showIcon = useMemo(() => isHovering || focused, [isHovering, focused])

  return {
    onAssigneeOpened,
    onAssigneeClosed,
    assigneeFocused: focused,
    showIcon,
  }
}
