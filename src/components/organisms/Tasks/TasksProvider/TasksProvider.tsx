import React, { createContext, useContext } from 'react'
import { createUseTask, CreateUseTaskResult, initialUseTask } from './useTask'
import {
  useTaskSection,
  UseTaskSectionResult,
  initialUseTaskSectionIds,
} from './useTaskSection'

type ContextProps = {
  isMyTasksPage: boolean
  isProjectsPage: boolean
  useTaskByTaskSection: CreateUseTaskResult
} & UseTaskSectionResult

type Props = {
  isMyTasksPage?: boolean
  isProjectsPage?: boolean
}
export type TasksProviderProps = Props

const Context = createContext<ContextProps>({
  isMyTasksPage: false,
  isProjectsPage: false,
  ...initialUseTaskSectionIds(),
  useTaskByTaskSection: () => initialUseTask(),
})
export const useTasksContext = () => useContext(Context)

export const TasksProvider: React.FC<Props> = (props) => {
  return (
    <Context.Provider
      value={{
        isMyTasksPage: !!props.isMyTasksPage,
        isProjectsPage: !!props.isProjectsPage,
        ...useTaskSection(props),
        useTaskByTaskSection: createUseTask(props),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
