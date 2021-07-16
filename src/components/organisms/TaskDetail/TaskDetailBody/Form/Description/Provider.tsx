import { useCallback, useState } from 'react'
import { useClickOutside } from 'src/hooks'
import { createProvider } from 'src/shared/react/createProvider'

const useValue = () => {
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

export const { Provider, useContext: useDescriptionContext } =
  createProvider(useValue)
