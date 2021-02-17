import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const atomState = atom({
  key: 'videoPlayerState',
  default: {
    isOpen: false,
  },
})

export const useVideoPlayer = () => {
  const [state, setState] = useRecoilState(atomState)

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
  }, [setState])

  const setIsOpen = useCallback(
    (val: boolean) => {
      setState((s) => ({ ...s, isOpen: val }))
    },
    [setState],
  )

  return {
    state,
    setIsOpen,
    onClose,
  }
}
