import { atom, useRecoilState } from 'recoil'
import { useCallback, useMemo } from 'react'

type State = {
  isOpen: boolean
  x: number
  y: number
  query: string
  id: number | null
  callback: (id: State['id']) => void
}

const atomState = atom<State>({
  key: 'editorMentionModalState',
  default: {
    isOpen: false,
    x: 0,
    y: 0,
    query: '',
    id: null,
    callback: () => {},
  },
})

const teammatesData = [
  {
    id: 1,
    name: 'Manato Kuroda',
    image: '/images/cat_img.png',
    email: 'manato.kuroda@gmail.com',
  },
  {
    id: 2,
    name: 'Dan Abrahmov',
    image: 'https://bit.ly/dan-abramov',
    email: 'dan.abrahmov@gmail.com',
  },
  {
    id: 3,
    name: 'Kent Dodds',
    image: 'https://bit.ly/kent-c-dodds',
    email: 'kent.dodds@gmail.com',
  },
] as const

// NOTE: Export onOpen method in order to execute prosemirror's plugins
// @see src/shared/prosemirror/config/plugins.ts
type onOpenProps = { x: State['x']; y: State['y'] }
export let onOpen: (args: onOpenProps) => Promise<State['id']>
export let onClose: (id?: State['id']) => void
export let setQuery: (query: string) => void
export let getQuery: () => string

export const useEditorMentionMenu = () => {
  const [state, setState] = useRecoilState(atomState)

  onClose = useCallback(
    (id) => {
      setState((s) => ({ ...s, isOpen: false }))
      state.callback(id ?? null)
    },
    [setState, state],
  )

  onOpen = useCallback(
    ({ x, y }: onOpenProps) => {
      return new Promise<State['id']>((resolve) => {
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

  const setId = useCallback(
    (id: State['id']) => {
      setState((s) => ({ ...s, id }))
      onClose(id)
    },
    [setState],
  )

  return {
    ...state,
    setId,
    onOpen,
    onClose,
    teammates,
  }
}
