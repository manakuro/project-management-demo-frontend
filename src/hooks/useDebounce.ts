import { useEffect, useRef, useState } from 'react'

export const useDebounce = <T extends any>(
  value: T,
  callback: (value: T) => void,
  delay = 100,
) => {
  const [state, setState] = useState(value)

  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (timer.current) {
      window.clearInterval(timer.current)
    }

    timer.current = window.setTimeout(() => {
      setState(value)
    }, delay)
  }, [delay, timer, value])

  useEffect(() => {
    callback(state)
  }, [callback, state])
}
