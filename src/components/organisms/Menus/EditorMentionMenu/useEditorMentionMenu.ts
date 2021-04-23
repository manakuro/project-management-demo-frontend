import { atom, useRecoilState } from 'recoil'
import { useCallback, useMemo } from 'react'
import { MentionItem } from './types'

type Id = number | null
type State = {
  isOpen: boolean
  x: number
  y: number
  query: string
  callback: () => void
  selectedIndex: number
}

const atomState = atom<State>({
  key: 'editorMentionModalState',
  default: {
    isOpen: false,
    x: 0,
    y: 0,
    query: '',
    callback: () => {},
    selectedIndex: 0,
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
export let onOpen: (args: onOpenProps) => Promise<void>
export let onClose: () => void
export let setQuery: (query: string) => void
export let getQuery: () => string
export let onArrowDown: () => void
export let onArrowUp: () => void
export let onEnter: () => void

type IdRef = Readonly<{ current: Id }>
const idRef: IdRef = {
  current: 0,
}
export const getId = () => idRef.current
export const setIdRef = (val: Id) =>
  void ((idRef as Writeable<IdRef>).current = val)

export const useEditorMentionMenu = () => {
  const [state, setState] = useRecoilState(atomState)

  onOpen = useCallback(
    ({ x, y }: onOpenProps) => {
      return new Promise<void>((resolve) => {
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

  const setId = useCallback((id: Id) => {
    setIdRef(id)
    onClose()
  }, [])

  const setSelectedIndex = useCallback(
    (val: number) => {
      setState((s) => ({ ...s, selectedIndex: val }))
    },
    [setState],
  )
  const resetSelectedIndex = useCallback(() => {
    setState((s) => ({ ...s, selectedIndex: 0 }))
  }, [setState])

  onArrowDown = useCallback(() => {
    const selectedIndex = state.selectedIndex + 1
    if (selectedIndex > mentions.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }))
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
  }, [mentions.length, setState, state.selectedIndex])

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1
    if (selectedIndex < 0) {
      setState((s) => ({ ...s, selectedIndex: mentions.length }))
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
  }, [mentions.length, setState, state.selectedIndex])

  onEnter = useCallback(() => {
    const mention = mentions.find((_, i) => i === state.selectedIndex)!
    setId(mention.id)
  }, [mentions, setId, state.selectedIndex])

  onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
    state.callback()
    resetSelectedIndex()
  }, [resetSelectedIndex, setState, state])

  return {
    ...state,
    setId,
    onOpen,
    onClose,
    mentions,
    setSelectedIndex,
  }
}
