import { atom, useRecoilState } from 'recoil'
import { useCallback, useMemo } from 'react'
import { MentionItem } from './types'

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

const mentionData: MentionItem[] = [
  {
    id: 1,
    type: 1,
    text: 'manato.kuroda@gmail.com',
    title: 'Manato Kuroda',
    subTitle: 'manato.kuroda@gmail.com',
    href: '',
    image: '/images/cat_img.png',
  },
  {
    id: 2,
    type: 1,
    text: 'dan.abrahmov@gmail.com',
    title: 'Dan Abrahmov',
    subTitle: 'dan.abrahmov@gmail.com',
    href: '',
    image: 'https://bit.ly/dan-abramov',
  },
  {
    id: 10,
    type: 2,
    text: 'Resolve an issue of auto focus for tasks list detail page',
    title: 'Resolve an issue of auto focus for tasks list detail page',
    subTitle: 'Asana',
    idDone: false,
    href: '',
  },
  {
    id: 11,
    type: 2,
    text: 'Implement task page',
    title: 'Implement task page',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 12,
    type: 2,
    text: 'Implement Inbox page',
    title: 'Implement Inbox page',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 13,
    type: 2,
    text: 'Implement Profile page',
    title: 'Implement Profile page',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 14,
    type: 2,
    text: 'Implement Message page',
    title: 'Implement Message page',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 2,
    type: 3,
    text: 'To Do',
    title: 'To Do',
    projectId: '2',
    href: '',
  },
  {
    id: 1,
    type: 4,
    text: 'My workspace',
    title: 'My workspace',
    href: '',
  },
]

// NOTE: Export functions in order to execute inside prosemirror's plugins
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

  const mentions = useMemo(() => {
    if (!state.query) return []
    return mentionData.filter((t) =>
      t.text.toLowerCase().includes(state.query.toLowerCase()),
    )
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
    mentions,
  }
}
