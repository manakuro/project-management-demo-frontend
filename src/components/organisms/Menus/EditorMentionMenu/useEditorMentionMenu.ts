import { atom, useRecoilState, useResetRecoilState } from 'recoil'
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
let onOpen: (args: onOpenProps) => Promise<void>
let onClose: () => void
let setQuery: (query: string) => void
let getQuery: () => string
let onArrowDown: () => void
let onArrowUp: () => void
let onEnter: () => void
let isOpen: boolean

type IdRef = Readonly<{ current: Id }>
const idRef: IdRef = {
  current: 0,
}
export const getMentionId = () => idRef.current
const setMentionIdRef = (val: Id) =>
  void ((idRef as Writeable<IdRef>).current = val)

type TypeRef = Readonly<{ current: MentionType | null }>
const typeRef: IdRef = {
  current: null,
}
export const getMentionType = () => typeRef.current
const setMentionTypeRef = (val: MentionType | null) =>
  void ((typeRef as Writeable<TypeRef>).current = val)

export type SetValueParam = {
  id: Id
  type: MentionType
}

export const useEditorMentionMenu = () => {
  const [state, setState] = useRecoilState(atomState)
  const resetState = useResetRecoilState(atomState)

  const reset = useCallback(() => {
    setMentionIdRef(null)
    setMentionTypeRef(null)
    resetState()
  }, [resetState])

  const mentions = useMemo<MentionItem[]>(() => {
    if (!state.query) return []
    return mentionData.filter((t) =>
      t.text.toLowerCase().includes(state.query.toLowerCase()),
    )
  }, [state.query])

  const setValue = useCallback((params: SetValueParam) => {
    setMentionIdRef(params.id)
    setMentionTypeRef(params.type)
    onClose()
  }, [])

  const setSelectedIndex = useCallback(
    (val: number) => {
      setState((s) => ({ ...s, selectedIndex: val }))
    },
    [setState],
  )

  const { containerRef } = useContainer()
  useOnKeyBindings({ mentions, setValue })
  useQuery()
  useDisclosure({ reset })

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

function useOnKeyBindings(props: {
  mentions: MentionItem[]
  setValue: (val: SetValueParam) => void
}) {
  const [state, setState] = useRecoilState(atomState)

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
    if (selectedIndex > props.mentions.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }))
      scrollTo(0)
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
    scrollTo(selectedIndex)
  }, [props.mentions.length, scrollTo, setState, state.selectedIndex])

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1
    if (selectedIndex < 0) {
      setState((s) => ({ ...s, selectedIndex: props.mentions.length }))
      scrollTo(props.mentions.length)
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
    scrollTo(-selectedIndex)
  }, [props.mentions.length, scrollTo, setState, state.selectedIndex])

  onEnter = useCallback(() => {
    const mention = props.mentions.find((_, i) => i === state.selectedIndex)

    // Do nothing when it is entered without selecting an item
    if (!mention || !state.query) return

    props.setValue({ id: mention.id, type: mention.type })
  }, [props, state.query, state.selectedIndex])
}

function useDisclosure(props: { reset: () => void }) {
  const [state, setState] = useRecoilState(atomState)

  onOpen = useCallback(
    ({ x, y }: onOpenProps) => {
      isOpen = true

      return new Promise<void>((resolve) => {
        setState((s) => ({
          ...s,
          isOpen: true,
          x,
          y,
          callback: resolve as () => Promise<void>,
        }))
      })
    },
    [setState],
  )

  onClose = useCallback(async () => {
    isOpen = false
    setState((s) => ({ ...s, isOpen: false }))
    state.callback()
  }, [setState, state])

  useEffect(() => {
    if (!state.isOpen) {
      // Use setTimeout to prevent moving back to the initial position ({ top: 0, left: 0 }) before closing
      setTimeout(() => {
        props.reset()
      })
    }
  }, [props, state.isOpen])
}

function useQuery() {
  const [state, setState] = useRecoilState(atomState)

  setQuery = useCallback(
    (query) => {
      setState((s) => ({ ...s, query }))
    },
    [setState],
  )
  getQuery = useCallback(() => state.query, [state.query])
}

function useContainer() {
  const [, setState] = useRecoilState(atomState)
  const containerRef = useRef<HTMLDivElement | null>(null)

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
    containerRef,
  }
}

export {
  onOpen as onMentionOpen,
  onClose as onMentionClose,
  setQuery as setMentionQuery,
  getQuery as getMentionQuery,
  onArrowDown as onMentionArrowDown,
  onArrowUp as onMentionArrowUp,
  onEnter as onMentionEnter,
  isOpen as isMentionOpen,
}
