import { useState, useRef, useEffect, useCallback } from 'react'

type Options = {
  skipElement?: (e: Event) => boolean
  skip?: boolean
}
export const useClickOutside = (
  onClickOutside?: () => void,
  options?: Options,
) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState({
    hasClickedOutside: false,
  })

  const handleEvent = useCallback(
    (e: Event) => {
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

          if (options?.skipElement?.(e)) return

          setState({ hasClickedOutside: true })
        }
      }
    },
    [options],
  )

  const removeEventListener = useCallback(() => {
    if (options?.skip) return

    console.log('Unsubscribe!!')

    if (window.PointerEvent) {
      document.removeEventListener('pointerdown', handleEvent)
    } else {
      document.removeEventListener('mousedown', handleEvent)
      document.removeEventListener('touchstart', handleEvent)
    }
  }, [handleEvent, options?.skip])

  useEffect(() => {
    if (options?.skip) return

    if (window.PointerEvent) {
      document.addEventListener('pointerdown', handleEvent)
    } else {
      document.addEventListener('mousedown', handleEvent)
      document.addEventListener('touchstart', handleEvent)
    }
    console.log('Subscribe!!')

    return () => {
      removeEventListener()
    }
  }, [handleEvent, options?.skip, removeEventListener])

  useEffect(() => {
    if (options?.skip) return

    if (state.hasClickedOutside) {
      onClickOutside?.()
    }
  }, [onClickOutside, state.hasClickedOutside, options?.skip])

  return {
    ref,
    hasClickedOutside: state.hasClickedOutside,
    removeEventListener,
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
