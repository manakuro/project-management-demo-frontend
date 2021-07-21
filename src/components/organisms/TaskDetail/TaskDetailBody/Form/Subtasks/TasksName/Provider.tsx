import React, { useMemo } from 'react'
import { useHover } from 'src/hooks/useHover'
import { createProvider } from 'src/shared/react/createProvider'
import { useInputFocus, UseInputFocus } from './useInputFocus'

type ContextProps = UseInputFocus & {
  ref: React.MutableRefObject<HTMLElement | null>
  isHovering: boolean
  showIcon: boolean
  taskId: string
}

type Props = {
  taskId: string
}
const useValue = (props: Props): ContextProps => {
  const useInputFocusResult = useInputFocus()
  const { ref, isHovering } = useHover()

  const showIcon = useMemo(() => isHovering, [isHovering])

  return {
    ...useInputFocusResult,
    ref,
    isHovering,
    showIcon,
    taskId: props.taskId,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailBody/Form/Subtasks/TaskName/Provider.tsx'
export const { Provider, useContext: useSubtasksNameContext } =
  createProvider(useValue)
