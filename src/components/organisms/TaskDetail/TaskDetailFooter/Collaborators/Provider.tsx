import React, { createContext, useCallback, useContext, useState } from 'react'

type ContextProps = {
  onInputFocus: () => void
  onInputUnfocus: () => void
  isInputFocused: boolean
}

const Context = createContext<ContextProps>({
  onInputFocus: () => void {},
  onInputUnfocus: () => void {},
  isInputFocused: false,
})
export const useCollaboratorsContext = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const { onInputFocus, onInputUnfocus, isInputFocused } = useInput()

  return (
    <Context.Provider
      value={{
        isInputFocused,
        onInputFocus,
        onInputUnfocus,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

function useInput() {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)

  const onInputFocus = useCallback(() => {
    setIsInputFocused(true)
  }, [])

  const onInputUnfocus = useCallback(() => {
    setIsInputFocused(false)
  }, [])

  return {
    isInputFocused,
    onInputFocus,
    onInputUnfocus,
  }
}
