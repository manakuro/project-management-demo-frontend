import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { useTasksContext } from 'src/components/organisms'
import { useTask, useTaskIdsByTaskParentId } from 'src/store/entities/tasks'

type ContextProps = {
  isSubtaskExpanded: boolean
  showExpandIcon: boolean
  onToggleExpandSubtask: () => void
}

type Props = {
  taskId: string
}
const Context = createContext<ContextProps>({
  isSubtaskExpanded: false,
  showExpandIcon: false,
  onToggleExpandSubtask: () => {},
})
export const useSubtaskListContext = () => useContext(Context)

export const Provider: React.FC<Props> = memo((props) => {
  const { isProjectsPage } = useTasksContext()
  const { task } = useTask(props.taskId)
  const { taskIds } = useTaskIdsByTaskParentId(props.taskId)
  const [isSubtaskExpanded, setIsSubtaskExpanded] = useState(false)
  const showExpandIcon = useMemo(
    () => isProjectsPage && !!taskIds.length && !task.taskParentId,
    [isProjectsPage, taskIds.length, task.taskParentId],
  )

  const onToggleExpandSubtask = useCallback(() => {
    setIsSubtaskExpanded((s) => !s)
  }, [])

  return (
    <Component
      {...props}
      isSubtaskExpanded={isSubtaskExpanded}
      showExpandIcon={showExpandIcon}
      onToggleExpandSubtask={onToggleExpandSubtask}
    />
  )
})

const Component: React.FC<Props & ContextProps> = memo(
  ({ children, ...rest }) => (
    <Context.Provider value={{ ...rest }}>{children}</Context.Provider>
  ),
)
Provider.displayName = 'Provider'
