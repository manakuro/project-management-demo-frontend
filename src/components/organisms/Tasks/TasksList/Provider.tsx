import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { FlexProps } from 'src/components/atoms'
import { useMyTasksTaskStatus } from 'src/store/app/myTasks'

type ContextProps = {
  taskColumnIds: string[]
  addedTaskSectionId: string
  setAddedTaskSectionId: React.Dispatch<React.SetStateAction<string>>
  resetAddedTaskSectionId: () => void
  sortedStyle: FlexProps
  needIndent: boolean
}

type Props = {
  taskColumnIds: string[]
}
const Context = createContext<ContextProps>({
  taskColumnIds: [],
  addedTaskSectionId: '',
  setAddedTaskSectionId: () => {},
  resetAddedTaskSectionId: () => {},
  sortedStyle: {},
  needIndent: false,
})
export const useTasksList = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const { taskColumnIds } = props
  const [addedTaskSectionId, setAddedTaskSectionId] = useState('')

  const { isSorted } = useMyTasksTaskStatus()
  const needIndent = useMemo(() => isSorted('dueDate'), [isSorted])
  const sortedStyle = useMemo<FlexProps>(
    () => (needIndent ? { pl: 8 } : {}),
    [needIndent],
  )

  const resetAddedTaskSectionId = useCallback(() => {
    setAddedTaskSectionId('')
  }, [])

  return (
    <Context.Provider
      value={{
        taskColumnIds,
        addedTaskSectionId,
        setAddedTaskSectionId,
        resetAddedTaskSectionId,
        sortedStyle,
        needIndent,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
