import { useState, useRef, useEffect, useCallback } from 'react'

type Options = {
  skipElement?: (e: Event) => boolean
  skip?: boolean
  hasClickedOutside?: (e: Event) => void
}
export const useClickOutside = (
  onClickOutside?: () => void,
  options: Options = {},
) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState({
    hasClickedOutside: false,
  })
  const { skipElement, skip, hasClickedOutside } = options

  const handleEvent = useCallback(
    (e: Event) => {
      if (ref && ref.current) {
        if (ref.current.contains(e.target as Node)) {
          setState({ hasClickedOutside: false })
        } else {
          // Manually check to see if the element has clicked outside
          if (hasClickedOutside?.(e)) {
            setState({ hasClickedOutside: true })
            return
          }

          // Ignore when click menu list inside popover modal
          if (
            isContainInMenuList(e) ||
            isContainInModalContent(e) ||
            isContainInPopoverContent(e) ||
            isContainInToastContent(e)
          )
            return

          if (skipElement?.(e)) return

          setState({ hasClickedOutside: true })
        }
      }
    },
    [skipElement, hasClickedOutside],
  )

  const removeEventListener = useCallback(() => {
    if (skip) return

    console.log('Unsubscribe!!')

    if (window.PointerEvent) {
      document.removeEventListener('pointerdown', handleEvent)
    } else {
      document.removeEventListener('mousedown', handleEvent)
      document.removeEventListener('touchstart', handleEvent)
    }
  }, [handleEvent, skip])

  useEffect(() => {
    if (skip) return

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
  }, [handleEvent, skip, removeEventListener])

  useEffect(() => {
    if (skip) return

    if (state.hasClickedOutside) {
      onClickOutside?.()
    }
  }, [onClickOutside, state.hasClickedOutside, skip])

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
const isContainInToastContent = (e: Event) =>
  Array.from(document.querySelectorAll("[aria-label='toast-content']")).some(
    (q) => q.contains(e.target as Node),
  )
