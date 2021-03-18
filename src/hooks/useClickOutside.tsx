import { useState, useRef, useEffect } from 'react'

export const useClickOutside = () => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState({
    hasClickedOutside: false,
  })

  const handleEvent = (e: Event) => {
    if (ref && ref.current) {
      if (ref.current.contains(e.target as Node)) {
        setState({ hasClickedOutside: false })
      } else {
        // Ignore when click menu list inside popover modal
        const isContainInMenuList = Array.from(
          document.querySelectorAll("[aria-label='menu-list']"),
        ).some((q) => q.contains(e.target as Node))

        if (isContainInMenuList) return

        setState({ hasClickedOutside: true })
      }
    }
  }

  useEffect(() => {
    if (window.PointerEvent) {
      document.addEventListener('pointerdown', handleEvent)
    } else {
      document.addEventListener('mousedown', handleEvent)
      document.addEventListener('touchstart', handleEvent)
    }
    console.log('Subscribe!!')

    return () => {
      console.log('Unsubscribe!!')
      if (window.PointerEvent) {
        document.removeEventListener('pointerdown', handleEvent)
      } else {
        document.removeEventListener('mousedown', handleEvent)
        document.removeEventListener('touchstart', handleEvent)
      }
    }
  }, [])

  return {
    ref,
    hasClickedOutside: state.hasClickedOutside,
  }
}
