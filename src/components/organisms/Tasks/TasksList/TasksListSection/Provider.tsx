import React, { createContext, useCallback, useContext, useState } from 'react'

type ContextProps = {
  focused: boolean
  onFocusInput: () => void
  onUnfocusInput: () => void
  taskSectionId: string
}

type Props = {
  taskSectionId: string
}
const Context = createContext<ContextProps>({
  focused: false,
  onFocusInput: () => void {},
  onUnfocusInput: () => void {},
  taskSectionId: '',
})
export const useTasksListSection = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const [focused, setFocused] = useState(false)

  const onFocusInput = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocusInput = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Context.Provider
      value={{
        focused,
        onFocusInput,
        onUnfocusInput,
        taskSectionId: props.taskSectionId,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
