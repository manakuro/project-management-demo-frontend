import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'

const atomState = atom({
  key: 'editorLinkModalState',
  default: {
    isOpen: false,
    x: 0,
    y: 0,
  },
})

export const useEditorLinkModal = () => {
  const [state, setState] = useRecoilState(atomState)

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
  }, [setState])

  const onOpen = useCallback(
    ({ x, y }) => {
      setState((s) => ({ ...s, isOpen: true, x, y }))
    },
    [setState],
  )

  return {
    ...state,
    onOpen,
    onClose,
  }
}
