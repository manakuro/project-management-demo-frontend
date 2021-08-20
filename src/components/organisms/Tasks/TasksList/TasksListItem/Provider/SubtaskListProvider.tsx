import { useCallback, useMemo, useState } from 'react'
import { useTasksContext } from 'src/components/organisms/Tasks'
import { createProvider } from 'src/shared/react/createProvider'
import { useTask, useTaskIdsByTaskParentId } from 'src/store/entities/tasks'

type ContextProps = {
  isSubtaskExpanded: boolean
  showExpandIcon: boolean
  onToggleExpandSubtask: () => void
}

type Props = {
  taskId: string
}

const useValue = (props: Props): ContextProps => {
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

  return {
    isSubtaskExpanded,
    showExpandIcon,
    onToggleExpandSubtask,
  } as const
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksList/TasksListItem/Provider/SubtaskListProvider.tsx'
export const { Provider, useContext: useSubtaskListContext } =
  createProvider(useValue)
