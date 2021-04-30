import React, { createContext, useContext } from 'react'
import { TasksNameProvider } from 'src/components/organisms/Tasks/TasksList/TasksListCells'

type ContextProps = {}

const Context = createContext<ContextProps>({})
export const useSubtaskName = () => useContext(Context)

export const SubtaskNameProvider: React.FC = (props) => {
  return (
    <TasksNameProvider>
      <Provider {...props} />
    </TasksNameProvider>
  )
}

const Provider: React.FC = (props) => {
  return <Context.Provider value={{}}>{props.children}</Context.Provider>
}
