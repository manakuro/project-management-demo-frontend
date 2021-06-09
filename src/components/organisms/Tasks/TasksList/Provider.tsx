import React, { createContext, useContext } from 'react'

type ContextProps = {}

type Props = {}
const Context = createContext<ContextProps>({})
export const useTasksList = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  return <Context.Provider value={{}}>{props.children}</Context.Provider>
}
