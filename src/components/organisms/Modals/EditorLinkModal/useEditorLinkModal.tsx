import { useCallback } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

type State = {
  isOpen: boolean
  x: number
  y: number
  input: {
    url: string
  }
  callback: (input: State['input']) => void
}

const atomState = atom<State>({
  key: 'editorLinkModalState',
  default: {
    isOpen: false,
    x: 0,
    y: 0,
    input: {
      url: '',
    },
    callback: () => {},
  },
})

export const useEditorLinkModal = () => {
  const [state, setState] = useRecoilState(atomState)
  const resetState = useResetRecoilState(atomState)

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
    state.callback(state.input)
    resetState()
  }, [resetState, setState, state])

  const onOpen = useCallback(
    ({ x, y }: { x: State['x']; y: State['y'] }) => {
      return new Promise<State['input']>((resolve) => {
        setState((s) => ({
          ...s,
          isOpen: true,
          x,
          y,
          callback: resolve,
        }))
      })
    },
    [setState],
  )

  const setInput = useCallback(
    (input: State['input']) => {
      setState((s) => ({ ...s, input }))
    },
    [setState],
  )

  return {
    ...state,
    setInput,
    onOpen,
    onClose,
  }
}
