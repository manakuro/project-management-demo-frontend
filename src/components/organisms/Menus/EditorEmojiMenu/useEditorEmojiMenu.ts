import { atom, useRecoilState } from 'recoil'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  BaseEmoji,
  emojiIndex as emojiData,
  frequently,
  EmojiData,
  EmojiSkin,
} from 'emoji-mart'

const DEFAULT_EMOJIS = [
  'grinning',
  'laughing',
  'sweat_smile',
  'joy',
  'scream',
  'sob',
  'sunglasses',
]
const defaultEmojis = (): BaseEmoji[] => {
  const frequentlyEmojis = frequently.get(2)
  const data = frequentlyEmojis.length
    ? frequentlyEmojis.slice(0, 7)
    : DEFAULT_EMOJIS

  return data.map((e) => {
    const matched = emojiData.emojis[e]
    if (isEmojiWithSkin(matched)) return matched[1]

    return matched
  }) as BaseEmoji[]
}
type EmojiWithSkin = { [variant in EmojiSkin]: EmojiData }
const isEmojiWithSkin = (data: any): data is EmojiWithSkin => !!data[1]

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
let isOpen: boolean

type EmojiRef = Readonly<{ current: BaseEmoji | null }>
const emojiRef: EmojiRef = {
  current: null,
}
export const getEmoji = () => emojiRef.current
const setEmojiRef = (val: BaseEmoji) =>
  void ((emojiRef as Writeable<EmojiRef>).current = val)

export const useEditorEmojiMenu = () => {
  const [state, setState] = useRecoilState(atomState)
  const containerRef = useRef<HTMLDivElement | null>(null)

  onOpen = useCallback(
    ({ x, y }: onOpenProps) => {
      isOpen = true

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

  const setValue = useCallback((val: BaseEmoji) => {
    setEmojiRef(val)
    onClose?.()
  }, [])

  const emojis = useMemo<BaseEmoji[]>(() => {
    if (!state.query) {
      return defaultEmojis()
    }
    return (
      (emojiData.search(state.query.toLowerCase()) as BaseEmoji[])?.map(
        (o) => o,
      ) || []
    ).slice(0, 10)
  }, [state.query])

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

    if (!emoji) return

    setValue(emoji)
  }, [emojis, setValue, state.selectedIndex])

  onClose = useCallback(() => {
    isOpen = false
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
  isOpen as isEmojiOpen,
}
