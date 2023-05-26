import { useCallback, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  onInputFocus: () => void
  onInputUnfocus: () => void
  isInputFocused: boolean
}

const useValue = (): ContextProps => {
  const { onInputFocus, onInputUnfocus, isInputFocused } = useInput()

  return {
    isInputFocused,
    onInputFocus,
    onInputUnfocus,
  } as const
}
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailFooter/Collaborators/Provider.tsx'
export const { Provider, useContext: useCollaboratorsContext } =
  createProvider(useValue)

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
