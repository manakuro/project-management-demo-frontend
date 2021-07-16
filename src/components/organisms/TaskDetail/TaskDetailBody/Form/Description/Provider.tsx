import React, { useCallback, useState } from 'react'
import { useClickOutside } from 'src/hooks'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  focused: boolean
  onFocus: () => void
  ref: React.MutableRefObject<HTMLElement | null>
}

const useValue = (): ContextProps => {
  const [focused, setFocused] = useState(false)

  const { ref } = useClickOutside(() => {
    setFocused(false)
  })

  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])

  return {
    focused,
    onFocus,
    ref,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/TaskDetail/TaskDetailBody/Form/Description/Provider.tsx'
export const { Provider, useContext: useDescriptionContext } =
  createProvider(useValue)
