import React, { createContext, useContext } from 'react'
import { createUseTask, CreateUseTaskResult, initialUseTask } from './useTask'
import {
  createUseTaskSection,
  CreateUseTaskSectionResult,
  initialUseTaskSection,
} from './useTaskSection'
import {
  createUseTaskStatus,
  CreateUseTaskStatusResult,
  initialUseTaskStatus,
} from './useTaskStatus'

type ContextProps = {
  isMyTasksPage: boolean
  isProjectsPage: boolean
  useTaskByTaskSection: CreateUseTaskResult
  useTaskSection: CreateUseTaskSectionResult
  useTaskStatus: CreateUseTaskStatusResult
}

type Props = {
  isMyTasksPage?: boolean
  isProjectsPage?: boolean
}
export type TasksProviderProps = Props

const Context = createContext<ContextProps>({
  isMyTasksPage: false,
  isProjectsPage: false,
  useTaskByTaskSection: () => initialUseTask(),
  useTaskSection: () => initialUseTaskSection(),
  useTaskStatus: () => initialUseTaskStatus(),
})
export const useTasksContext = () => useContext(Context)

export const TasksProvider: React.FC<Props> = (props) => {
  return (
    <Context.Provider
      value={{
        isMyTasksPage: !!props.isMyTasksPage,
        isProjectsPage: !!props.isProjectsPage,
        useTaskSection: createUseTaskSection(props),
        useTaskStatus: createUseTaskStatus(props),
        useTaskByTaskSection: createUseTask(props),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
