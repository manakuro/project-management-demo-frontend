import React, { createContext, useCallback, useContext } from 'react'
import { createUseTaskIds, CreateUseTaskIdsResult } from './useTaskIds'
import {
  useTaskSectionIds,
  UseTaskSectionIdsResult,
  initialUseTaskSectionIds,
} from './useTaskSectionIds'

type ContextProps = {
  addTask: () => void
  addSection: () => void
  useTaskIds: CreateUseTaskIdsResult
} & UseTaskSectionIdsResult

type Props = {
  myTasks?: boolean
  projects?: boolean
}
export type TasksProviderProps = Props

const Context = createContext<ContextProps>({
  addTask: () => {},
  addSection: () => {},
  ...initialUseTaskSectionIds(),
  useTaskIds: () => ({
    taskIds: [],
  }),
})
export const useTasksContext = () => useContext(Context)

export const TasksProvider: React.FC<Props> = (props) => {
  const addTask = useCallback(() => {}, [])
  const addSection = useCallback(() => {}, [])

  return (
    <Context.Provider
      value={{
        addTask,
        addSection,
        ...useTaskSectionIds(props),
        useTaskIds: createUseTaskIds(props),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
