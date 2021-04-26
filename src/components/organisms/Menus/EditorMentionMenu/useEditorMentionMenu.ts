import { atom, useRecoilState } from 'recoil'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { MentionItem, MentionType } from './types'

type Id = number | null
type State = {
  isOpen: boolean
  x: number
  y: number
  query: string
  callback: () => void
  selectedIndex: number
  containerRef: HTMLDivElement | null
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
    containerRef: null,
  },
})

export const mentionData: MentionItem[] = [
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
    id: 1,
    type: 2,
    text: 'Resolve an issue of auto focus for tasks list detail page',
    title: 'Resolve an issue of auto focus for tasks list detail page',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 2,
    type: 2,
    text: 'Implement Task Due Soon',
    title: 'Implement Task Due Soon',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 3,
    type: 2,
    text: 'Implement Recent Projects',
    title: 'Implement Recent Projects',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 4,
    type: 2,
    text: 'Implement Date picker',
    title: 'Implement Date picker',
    subTitle: 'Asana',
    idDone: true,
    href: '',
  },
  {
    id: 5,
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
const setIdRef = (val: Id) => void ((idRef as Writeable<IdRef>).current = val)

type TypeRef = Readonly<{ current: MentionType | null }>
const typeRef: IdRef = {
  current: null,
}
export const getType = () => typeRef.current
const setTypeRef = (val: MentionType) =>
  void ((typeRef as Writeable<TypeRef>).current = val)

export type SetValueParam = {
  id: Id
  type: MentionType
}

export const useEditorMentionMenu = () => {
  const [state, setState] = useRecoilState(atomState)
  const containerRef = useRef<HTMLDivElement | null>(null)

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

  const setValue = useCallback((params: SetValueParam) => {
    setIdRef(params.id)
    setTypeRef(params.type)
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

  const scrollTo = useCallback(
    (index: number) => {
      const dom = state.containerRef
      if (!dom) return

      if (index === 0) dom.scrollTop = 0
      if (index < 5) return

      dom.scrollTop += 50 * index
    },
    [state.containerRef],
  )

  onArrowDown = useCallback(() => {
    const selectedIndex = state.selectedIndex + 1
    if (selectedIndex > mentions.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }))
      scrollTo(0)
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
    scrollTo(selectedIndex)
  }, [mentions.length, scrollTo, setState, state.selectedIndex])

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1
    if (selectedIndex < 0) {
      setState((s) => ({ ...s, selectedIndex: mentions.length }))
      scrollTo(mentions.length)
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
    scrollTo(-selectedIndex)
  }, [mentions.length, scrollTo, setState, state.selectedIndex])

  onEnter = useCallback(() => {
    const mention = mentions.find((_, i) => i === state.selectedIndex)

    // Do nothing when it is entered without selecting an item
    if (!mention) return

    setValue({ id: mention.id, type: mention.type })
  }, [mentions, setValue, state.selectedIndex])

  onClose = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }))
    state.callback()
    resetSelectedIndex()
  }, [resetSelectedIndex, setState, state])

  useEffect(() => {
    if (containerRef.current) {
      setState((s) => ({
        ...s,
        containerRef: containerRef.current,
      }))
    }

    return () => {
      setState((s) => ({ ...s, containerRef: null }))
    }
  }, [setState])

  return {
    ...state,
    setValue,
    onOpen,
    onClose,
    mentions,
    setSelectedIndex,
    containerRef,
  }
}
