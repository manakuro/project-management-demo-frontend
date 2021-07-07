import React, { createContext, useContext } from 'react'

type ContextProps = {
  taskColumnIds: string[]
}

type Props = {
  taskColumnIds: string[]
}
const Context = createContext<ContextProps>({
  taskColumnIds: [],
})
export const useTasksListContext = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const { taskColumnIds } = props

  return (
    <Context.Provider
      value={{
        taskColumnIds,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
