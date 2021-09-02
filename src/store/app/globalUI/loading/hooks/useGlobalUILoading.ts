import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { loadingState } from '../atom'

export const useGlobalUILoading = () => {
  const [loading, setLoading] = useRecoilState(loadingState)

  const endLoading = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  return {
    loading,
    endLoading,
  }
}
