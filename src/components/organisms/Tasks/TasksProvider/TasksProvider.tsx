import React, { createContext, useContext } from 'react'

type ContextProps = {
  isMyTasksPage: boolean
  isProjectsPage: boolean
}

type Props = {
  isMyTasksPage?: boolean
  isProjectsPage?: boolean
}
export type TasksProviderProps = Props

const Context = createContext<ContextProps>({
  isMyTasksPage: false,
  isProjectsPage: false,
})
export const useTasksContext = () => useContext(Context)

export const TasksProvider: React.FC<Props> = (props) => {
  return (
    <Context.Provider
      value={{
        isMyTasksPage: !!props.isMyTasksPage,
        isProjectsPage: !!props.isProjectsPage,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
