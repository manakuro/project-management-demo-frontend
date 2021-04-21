import { atom, useRecoilState } from 'recoil'
import { useCallback, useMemo } from 'react'

type State = {
  isOpen: boolean
  x: number
  y: number
  query: string
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
    query: '',
    input: {
      url: '',
    },
    callback: () => {},
  },
})

const teammatesData = [
  {
    id: '1',
    name: 'Manato Kuroda',
    image: '/images/cat_img.png',
    email: 'manato.kuroda@gmail.com',
  },
  {
    id: '2',
    name: 'Dan Abrahmov',
    image: 'https://bit.ly/dan-abramov',
    email: 'dan.abrahmov@gmail.com',
  },
  {
    id: '3',
    name: 'Kent Dodds',
    image: 'https://bit.ly/kent-c-dodds',
    email: 'kent.dodds@gmail.com',
  },
] as const

// NOTE: Export onOpen method in order to execute prosemirror's plugins
// @see src/shared/prosemirror/config/plugins.ts
type onOpenProps = { x: State['x']; y: State['y'] }
export let onOpen: (args: onOpenProps) => void
export let onClose: () => void
export let setQuery: (query: string) => void

export const useEditorMentionMenu = () => {
  const [state, setState] = useRecoilState(atomState)

  onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
    state.callback(state.input)
  }, [setState, state])

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
  setQuery = useCallback(
    (query) => {
      setState((s) => ({ ...s, query }))
    },
    [setState],
  )

  const teammates = useMemo(() => {
    if (!state.query) return []
    return teammatesData.filter((t) => t.email.includes(state.query))
  }, [state.query])

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
    teammates,
  }
}
