import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { FlexProps } from 'src/components/atoms'

type ContextProps = {
  focused: boolean
  onFocusInput: () => void
  onUnfocusInput: () => void
  taskSectionId: string
  indented?: boolean
  indentedStyle: FlexProps
}

type Props = {
  taskSectionId: string
  indented?: boolean
}
const Context = createContext<ContextProps>({
  focused: false,
  onFocusInput: () => void {},
  onUnfocusInput: () => void {},
  taskSectionId: '',
  indented: false,
  indentedStyle: {},
})
export const useTasksListSectionContext = () => useContext(Context)

export const Provider: React.FC<Props> = (props) => {
  const [focused, setFocused] = useState(false)

  const onFocusInput = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocusInput = useCallback(() => {
    setFocused(false)
  }, [])

  const indentedStyle = useMemo<FlexProps>(
    () => (props.indented ? { pl: 8 } : {}),
    [props.indented],
  )

  return (
    <Context.Provider
      value={{
        focused,
        onFocusInput,
        onUnfocusInput,
        taskSectionId: props.taskSectionId,
        indented: props.indented,
        indentedStyle,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
