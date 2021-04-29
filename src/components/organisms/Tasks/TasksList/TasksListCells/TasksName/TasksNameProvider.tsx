import React, { createContext, useContext } from 'react'
import { useInputFocus, UseInputFocus } from './useInputFocus'

type ContextProps = UseInputFocus

const Context = createContext<ContextProps>({
  inputFocused: false,
  setInputFocused: () => void {},
  cellStyle: {},
  onInputBlur: () => {},
  onInputFocus: () => {},
})
export const useTasksName = () => useContext(Context)

export const TasksNameProvider: React.FC = (props) => {
  const useInputFocusResult = useInputFocus()

  return (
    <Context.Provider value={{ ...useInputFocusResult }}>
      {props.children}
    </Context.Provider>
  )
}
