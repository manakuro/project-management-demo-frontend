import React, { createContext, useCallback, useContext, useState } from 'react'
import { useClickOutside } from 'src/hooks'

type ContextProps = {
  focused: boolean
  ref: React.MutableRefObject<HTMLElement | null>
  onFocus: () => void
}

const Context = createContext<ContextProps>({
  ref: null as any,
  focused: false,
  onFocus: () => void {},
})
export const useDescription = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const [focused, setFocused] = useState(false)

  const { ref } = useClickOutside(() => {
    setFocused(false)
  })

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  return (
    <Context.Provider
      value={{
        focused,
        onFocus,
        ref,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
