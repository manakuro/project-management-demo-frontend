import { atom, useRecoilState } from 'recoil'
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

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
    state.callback(state.input)
  }, [setState, state])

  const onOpen = useCallback(
    ({ x, y }) => {
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
