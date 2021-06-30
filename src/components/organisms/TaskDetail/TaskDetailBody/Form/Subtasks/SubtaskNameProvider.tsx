import React, { createContext, useContext } from 'react'
import { TasksNameProvider } from 'src/components/organisms/Tasks/TasksList/TasksListCells'

type ContextProps = {}

const Context = createContext<ContextProps>({})
export const useSubtaskName = () => useContext(Context)

type Props = {
  taskId: string
}
export const SubtaskNameProvider: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider taskId={props.taskId}>
      <Provider {...props} />
    </TasksNameProvider>
  )
}

const Provider: React.FC = (props) => {
  return <Context.Provider value={{}}>{props.children}</Context.Provider>
}
