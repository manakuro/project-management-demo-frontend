import React, { createContext, useCallback, useContext, useState } from 'react'

type ContextProps = {
  focused: boolean
  onFocusInput: () => void
  onUnfocusInput: () => void
}

type Props = {}
const Context = createContext<ContextProps>({
  focused: false,
  onFocusInput: () => void {},
  onUnfocusInput: () => void {},
})
export const useTasksListSectionHeader = () => useContext(Context)

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
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
