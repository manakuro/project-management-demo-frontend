import { useCallback, useEffect } from 'react'
import lodashDebounce from 'lodash/debounce'

export const useDebounce = <T extends any>(
  value: T,
  callback: (val: T) => void,
  delay = 100,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounce = useCallback(
    lodashDebounce((val: T) => {
      callback(val)
    }, delay),
    [callback, delay],
  )

  useEffect(() => {
    debounce(value)
  }, [debounce, value])
}
