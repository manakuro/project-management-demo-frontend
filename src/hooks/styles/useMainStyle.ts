import { useMemo } from 'react'

export const useMainStyle = () => {
  const paddingX = useMemo(() => 6, [])

  return {
    paddingX,
  }
}
