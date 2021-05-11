import { useState, useRef, useEffect } from 'react'

export const useClickOutside = (onClickOutside?: () => void) => {
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
        if (
          isContainInMenuList(e) ||
          isContainInModalContent(e) ||
          isContainInPopoverContent(e)
        )
          return

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

  useEffect(() => {
    if (state.hasClickedOutside) {
      onClickOutside?.()
    }
  }, [onClickOutside, state.hasClickedOutside])

  return {
    ref,
    hasClickedOutside: state.hasClickedOutside,
  }
}

const isContainInMenuList = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='menu-list']")).some((q) =>
    q.contains(e.target as Node),
  )
const isContainInModalContent = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='modal-content']")).some(
    (q) => q.contains(e.target as Node),
  )
const isContainInPopoverContent = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='popover-content']")).some(
    (q) => q.contains(e.target as Node),
  )
