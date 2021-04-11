import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useCallback } from 'react'

type State = {
  isOpen: boolean
  x: number
  y: number
  input: {
    text: string
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
      text: '',
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
    ({ x, y, text }: { x: State['x']; y: State['y']; text: string }) => {
      return new Promise<State['input']>((resolve) => {
        setState(() => ({
          isOpen: true,
          input: {
            text,
            url: '',
          },
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
