import React, { createContext, useContext, useMemo } from 'react'
import { useHover } from 'src/hooks/useHover'
import { useInputFocus, UseInputFocus } from './useInputFocus'
import { useMarkMenuFocus, UseMarkMenuFocus } from './useMarkMenuFocus'

type ContextProps = UseInputFocus &
  UseMarkMenuFocus & {
    ref: React.MutableRefObject<HTMLElement | null>
    isHovering: boolean
    showIcon: boolean
    showMark: boolean
  }
export type TasksNameContextProps = ContextProps

const Context = createContext<ContextProps>({
  inputFocused: false,
  setInputFocused: () => void {},
  cellStyle: {},
  onInputBlur: () => {},
  onInputFocus: () => {},
  markMenuFocused: false,
  onMarkMenuClosed: () => {},
  onMarkMenuOpened: () => {},
  isHovering: false,
  showIcon: false,
  showMark: false,
  ref: null as any,
})
export const useTasksName = () => useContext(Context)

export const TasksNameProvider: React.FC = (props) => {
  const useInputFocusResult = useInputFocus()
  const { markMenuFocused, onMarkMenuClosed, onMarkMenuOpened } =
    useMarkMenuFocus()
  const { ref, isHovering } = useHover()

  const showIcon = useMemo(
    () => isHovering || markMenuFocused,
    [isHovering, markMenuFocused],
  )

  const showMark = useMemo(
    () => (isHovering || markMenuFocused) && !useInputFocusResult.inputFocused,
    [isHovering, markMenuFocused, useInputFocusResult.inputFocused],
  )

  return (
    <Context.Provider
      value={{
        ...useInputFocusResult,
        markMenuFocused,
        onMarkMenuClosed,
        onMarkMenuOpened,
        ref,
        isHovering,
        showIcon,
        showMark,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
