import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTasksContext } from 'src/components/organisms'
import { ROUTE_MY_TASKS, useRouter } from 'src/router'
import { useTask, useTaskIdsByTaskParentId } from 'src/store/entities/tasks'

type ContextProps = {
  selected: boolean
  showExpandIcon: boolean
  setIsSubtaskExpanded: React.Dispatch<React.SetStateAction<boolean>>
  isSubtaskExpanded: boolean
  onToggleExpandSubtask: () => void
}

type Props = {
  taskId: string
}
const Context = createContext<ContextProps>({
  selected: false,
  showExpandIcon: false,
  setIsSubtaskExpanded: () => {},
  isSubtaskExpanded: false,
  onToggleExpandSubtask: () => {},
})
export const useTasksListItemContext = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const { selected } = useRow(props)
  const { isProjectsPage } = useTasksContext()
  const { taskIds } = useTaskIdsByTaskParentId(props.taskId)
  const { task } = useTask(props.taskId)
  const [isSubtaskExpanded, setIsSubtaskExpanded] = useState(false)

  const showExpandIcon = useMemo(
    () => isProjectsPage && !!taskIds.length && !task.taskParentId,
    [isProjectsPage, taskIds.length, task.taskParentId],
  )

  const onToggleExpandSubtask = useCallback(() => {
    setIsSubtaskExpanded((s) => !s)
  }, [])

  return (
    <Context.Provider
      value={{
        selected,
        showExpandIcon,
        isSubtaskExpanded,
        setIsSubtaskExpanded,
        onToggleExpandSubtask,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

function useRow(props: Props) {
  const [selected, setSelected] = useState<boolean>(false)
  const { router } = useRouter()

  useEffect(() => {
    if (router.query[ROUTE_MY_TASKS['name']]?.[0] === props.taskId) {
      setSelected(true)
      return
    }
    setSelected(false)
  }, [props.taskId, router])

  return {
    selected,
  }
}
