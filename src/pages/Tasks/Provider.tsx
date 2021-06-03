import React, { createContext, useContext } from 'react'

type ContextProps = {
  loading: boolean
}

const Context = createContext<ContextProps>({
  loading: false,
})
export const useTasksComponent = () => useContext(Context)

type Props = {
  loading: boolean
}
export const Provider: React.FC<Props> = (props) => {
  return (
    <Context.Provider
      value={{
        loading: props.loading,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
