import React, { createContext, useContext } from 'react'
import { createUseTask, CreateUseTaskResult, initialUseTask } from './useTask'
import {
  useTaskSection,
  UseTaskSectionResult,
  initialUseTaskSectionIds,
} from './useTaskSection'

type ContextProps = {
  useTaskByTaskSection: CreateUseTaskResult
} & UseTaskSectionResult

type Props = {
  myTasks?: boolean
  projects?: boolean
}
export type TasksProviderProps = Props

const Context = createContext<ContextProps>({
  ...initialUseTaskSectionIds(),
  useTaskByTaskSection: () => initialUseTask(),
})
export const useTasksContext = () => useContext(Context)

export const TasksProvider: React.FC<Props> = (props) => {
  return (
    <Context.Provider
      value={{
        ...useTaskSection(props),
        useTaskByTaskSection: createUseTask(props),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
