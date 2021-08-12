import { atom, useRecoilState } from 'recoil'

const key = (str: string) => `src/store/app/globalUI/loading/${str}`

export const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: true,
})

export const useGlobalUILoading = () => {
  const [loading, setLoading] = useRecoilState(loadingState)

  return {
    loading,
    setLoading,
  }
}
