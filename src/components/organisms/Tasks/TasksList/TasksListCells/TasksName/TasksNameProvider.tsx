import React, { useMemo } from 'react'
import { useHover } from 'src/hooks/useHover'
import { createProvider } from 'src/shared/react/createProvider'
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

type Props = {
  taskId: string
}
const useValue = (props: Props): ContextProps => {
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

  return {
    ...useInputFocusResult,
    markMenuFocused,
    onMarkMenuClosed,
    onMarkMenuOpened,
    ref,
    isHovering,
    showIcon,
    showMark,
    taskId: props.taskId,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName/TasksNameProvider.tsx'
export const { Provider: TasksNameProvider, useContext: useTasksNameContext } =
  createProvider(useValue)
