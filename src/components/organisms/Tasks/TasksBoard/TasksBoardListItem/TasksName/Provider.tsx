import React, { useCallback, useState } from 'react'
import { useHover } from 'src/hooks/useHover'
import { createProvider } from 'src/shared/react/createProvider'
import { useInputFocus, UseInputFocus } from './useInputFocus'

type ContextProps = UseInputFocus & {
  ref: React.MutableRefObject<HTMLElement | null>
  isHovering: boolean
  taskId: string
  isTransitioning: boolean
  onStartTransition: () => void
  onEndTransition: () => void
}

type Props = {
  taskId: string
}
const useValue = (props: Props): ContextProps => {
  const useInputFocusResult = useInputFocus()
  const { ref, isHovering } = useHover()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const onStartTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const onEndTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return {
    ...useInputFocusResult,
    ref,
    isHovering,
    taskId: props.taskId,
    isTransitioning,
    onStartTransition,
    onEndTransition,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem/TasksName/Provider.tsx'
export const { Provider: TasksNameProvider, useContext: useTasksNameContext } =
  createProvider(useValue)
