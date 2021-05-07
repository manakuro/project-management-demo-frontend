import { useEffect, useRef } from 'react'

export const useDebounce = <T extends any>(
  value: T,
  callback: (value: T) => void,
  delay: number,
) => {
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current)

    timer.current = window.setTimeout(() => {
      callback(value)
    }, delay)
  }, [callback, delay, timer, value])
}
