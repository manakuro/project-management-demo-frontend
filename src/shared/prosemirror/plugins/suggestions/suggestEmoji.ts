import { Suggester } from 'prosemirror-suggest'
import {
  onEmojiOpen as onOpen,
  onEmojiClose as onClose,
  setEmojiQuery as setQuery,
  getEmoji,
  onEmojiArrowDown as onArrowDown,
  onEmojiArrowUp as onArrowUp,
  onEmojiEnter as onEnter,
} from 'src/components/features/organisms/Menus/EditorEmojiMenu'

export const suggestEmoji: Suggester = {
  noDecorations: true,
  char: ':',
  name: 'emoji-suggestion',
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
      return true
    },
  },
  onChange: async (params) => {
    setQuery(params.queryText.full)
    await onOpen()
    params.command()
  },

  createCommand: (params) => {
    return () => {
      if (!getEmoji()) return

      const emoji = getEmoji()?.native + '  '
      const state = params.view.state
      const { from, end: to } = params.match.range
      const { tr } = state
      params.view.dispatch(tr.insertText(emoji, from, to))
    }
  },
  onExit: () => {
    onClose()
  },
}
