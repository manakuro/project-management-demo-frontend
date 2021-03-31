import useHoverReactHook from '@react-hook/hover'
import { useRef } from 'react'

export const useHover = () => {
  const ref = useRef<HTMLElement | null>(null)
  const isHovering = useHoverReactHook(ref)

  return {
    ref,
    isHovering,
  }
}
