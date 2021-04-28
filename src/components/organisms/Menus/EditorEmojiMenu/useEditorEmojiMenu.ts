import { atom, useRecoilState } from 'recoil'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { BaseEmoji, emojiIndex as emojiData } from 'emoji-mart'

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
  key: 'editorEmojiModalState',
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

type IdRef = Readonly<{ current: Id }>
const idRef: IdRef = {
  current: 0,
}
export const getEmojiId = () => idRef.current
const setEmojiIdRef = (val: Id) =>
  void ((idRef as Writeable<IdRef>).current = val)

export const useEditorEmojiMenu = () => {
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

  const emojis = useMemo<BaseEmoji[]>(() => {
    if (!state.query) return []
    return (
      (emojiData.search(state.query.toLowerCase()) as BaseEmoji[])?.map(
        (o) => o,
      ) || []
    ).slice(0, 10)
  }, [state.query])

  const setValue = useCallback((params: any) => {
    setEmojiIdRef(params.id)
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
    if (selectedIndex > emojis.length) {
      setState((s) => ({ ...s, selectedIndex: 0 }))
      scrollTo(0)
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
    scrollTo(selectedIndex)
  }, [emojis, scrollTo, setState, state.selectedIndex])

  onArrowUp = useCallback(() => {
    const selectedIndex = state.selectedIndex - 1
    if (selectedIndex < 0) {
      setState((s) => ({ ...s, selectedIndex: emojis.length }))
      scrollTo(emojis.length)
      return
    }

    setState((s) => ({ ...s, selectedIndex }))
    scrollTo(-selectedIndex)
  }, [emojis.length, scrollTo, setState, state.selectedIndex])

  onEnter = useCallback(() => {
    const emoji = emojis.find((_, i) => i === state.selectedIndex)

    // Do nothing when it is entered without selecting an item
    if (!emoji || !state.query) return

    setValue({ id: emoji.id })
  }, [emojis, setValue, state.query, state.selectedIndex])

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
    emojis,
    setSelectedIndex,
    containerRef,
  }
}

export {
  onOpen as onEmojiOpen,
  onClose as onEmojiClose,
  setQuery as setEmojiQuery,
  getQuery as getEmojiQuery,
  onArrowDown as onEmojiArrowDown,
  onArrowUp as onEmojiArrowUp,
  onEnter as onEmojiEnter,
}
