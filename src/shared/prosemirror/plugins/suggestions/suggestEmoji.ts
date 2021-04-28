import { Suggester } from 'prosemirror-suggest'
import {
  onEmojiOpen as onOpen,
  onEmojiClose as onClose,
  setEmojiQuery as setQuery,
  getEmojiQuery as getQuery,
  getEmoji,
  onEmojiArrowDown as onArrowDown,
  onEmojiArrowUp as onArrowUp,
  onEmojiEnter as onEnter,
} from 'src/components/organisms/Menus/EditorEmojiMenu'
import { getCaretPosition } from 'src/shared/getCaretPosition'
import { EmojiAttrs } from 'src/shared/prosemirror/schema'

export const suggestEmoji: Suggester = {
  noDecorations: true,
  char: ':',
  name: 'emoji-suggestion',
  appendText: '',
  keyBindings: {
    ArrowDown: (params) => {
      params.event.preventDefault()

      onArrowDown()
    },
    ArrowUp: (params) => {
      params.event.preventDefault()

      onArrowUp()
    },
    Enter: (params) => {
      params.event.preventDefault()
      onEnter()
    },
    Esc: (params) => {
      params.event.preventDefault()
      onClose()
    },
  },
  onChange: async (params) => {
    setQuery(params.queryText.full)

    const position = getCaretPosition()
    if (!position) return

    await onOpen({
      x: Number(position?.x),
      y: Number(position?.y),
    })
    params.command()
  },

  createCommand: (params) => {
    return () => {
      if (!getEmoji()) return

      const state = params.view.state
      const node = state.schema.nodes.emoji.create({
        emoji: getEmoji()?.native,
      } as EmojiAttrs)
      const { from, end: to } = params.match.range
      const tr = state.tr.replaceWith(from, to + getQuery().length, node)
      params.view.dispatch(tr)
    }
  },
  onExit: () => {
    onClose()
  },
}
