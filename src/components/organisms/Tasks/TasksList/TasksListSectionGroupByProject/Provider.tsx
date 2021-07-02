import React, { createContext, useContext } from 'react'

type ContextProps = {
  projectId: string
}

type Props = {
  projectId: string
}
const Context = createContext<ContextProps>({
  projectId: '',
})
export const useTasksListSectionGroupByProjectContext = () =>
  useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  return (
    <Context.Provider
      value={{
        projectId: props.projectId,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
