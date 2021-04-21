import { atom, useRecoilState } from 'recoil'
import { useCallback, useMemo } from 'react'

type State = {
  isOpen: boolean
  x: number
  y: number
  query: string
  value: string
  callback: (value: State['value']) => void
}

const atomState = atom<State>({
  key: 'editorMentionModalState',
  default: {
    isOpen: false,
    x: 0,
    y: 0,
    query: '',
    value: '',
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
export let onOpen: (args: onOpenProps) => Promise<State['value']>
export let onClose: (value?: string) => void
export let setQuery: (query: string) => void
export let getQuery: () => string

export const useEditorMentionMenu = () => {
  const [state, setState] = useRecoilState(atomState)

  onClose = useCallback(
    (value) => {
      setState((s) => ({ ...s, isOpen: false }))
      state.callback(value ?? '')
    },
    [setState, state],
  )

  onOpen = useCallback(
    ({ x, y }: onOpenProps) => {
      return new Promise<State['value']>((resolve) => {
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
  getQuery = useCallback(() => state.query, [state.query])

  const teammates = useMemo(() => {
    if (!state.query) return []
    return teammatesData.filter((t) => t.email.includes(state.query))
  }, [state.query])

  const setValue = useCallback(
    (value: State['value']) => {
      setState((s) => ({ ...s, value }))
      onClose(value)
    },
    [setState],
  )

  return {
    ...state,
    setValue,
    onOpen,
    onClose,
    teammates,
  }
}
