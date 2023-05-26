import { useCallback, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  focused: boolean
  onFocusInput: () => void
  onUnfocusInput: () => void
  taskSectionId: string
}

type Props = {
  taskSectionId: string
}

const useValue = (props: Props): ContextProps => {
  const [focused, setFocused] = useState(false)

  const onFocusInput = useCallback(() => {
    setFocused(true)
  }, [])

  const onUnfocusInput = useCallback(() => {
    setFocused(false)
  }, [])

  return {
    focused,
    onFocusInput,
    onUnfocusInput,
    taskSectionId: props.taskSectionId,
  } as const
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListSection/Provider.tsx'
export const { Provider, useContext: useTasksBoardListSectionContext } =
  createProvider(useValue)
