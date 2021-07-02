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
    taskId: string
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
  taskId: '',
})
export const useTasksNameContext = () => useContext(Context)

type Props = {
  taskId: string
}
export const TasksNameProvider: React.FC<Props> = (props) => {
  const useInputFocusResult = useInputFocus()
  const { markMenuFocused, onMarkMenuClosed, onMarkMenuOpened } =
    useMarkMenuFocus()
  const { ref, isHovering } = useHover()

  const showIcon = useMemo(
    () => isHovering || markMenuFocused,
    [isHovering, markMenuFocused],
  )

  const showMark = useMemo(
    () => isHovering || markMenuFocused,
    [isHovering, markMenuFocused],
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
        taskId: props.taskId,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
