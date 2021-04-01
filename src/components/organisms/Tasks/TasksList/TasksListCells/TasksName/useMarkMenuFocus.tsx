import { useCallback, useState } from 'react'

export const useMarkMenuFocus = () => {
  const [focused, setFocused] = useState(false)
  const onMarkMenuOpened = useCallback(() => {
    setFocused(true)
  }, [])
  const onMarkMenuClosed = useCallback(() => {
    setFocused(false)
  }, [])

  return {
    markMenuFocused: focused,
    setMarkMenuFocused: setFocused,
    onMarkMenuOpened,
    onMarkMenuClosed,
  }
}
