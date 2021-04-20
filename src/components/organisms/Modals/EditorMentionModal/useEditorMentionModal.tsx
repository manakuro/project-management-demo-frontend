import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useCallback } from 'react'

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
  key: 'editorMentionModalState',
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

// NOTE: Export onOpen method in order to execute prosemirror's plugins
// @see src/shared/prosemirror/config/plugins.ts
type onOpenProps = { x: State['x']; y: State['y'] }
export let onOpen: (args: onOpenProps) => void

export const useEditorMentionModal = () => {
  const [state, setState] = useRecoilState(atomState)
  const resetState = useResetRecoilState(atomState)

  const onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
    state.callback(state.input)
    resetState()
  }, [resetState, setState, state])

  onOpen = useCallback(
    ({ x, y }: onOpenProps) => {
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
