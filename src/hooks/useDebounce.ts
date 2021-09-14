import { useEffect, useRef } from 'react'
import { useMountedRef } from 'src/hooks/useMountedRef'

export const useDebounce = <T extends any>(
  value: T,
  callback: (value: T) => void,
  delay: number,
) => {
  const timer = useRef<number | null>(null)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current)

    timer.current = window.setTimeout(() => {
      if (!mountedRef.current) return

      callback(value)
    }, delay)
  }, [callback, delay, mountedRef, timer, value])
}
