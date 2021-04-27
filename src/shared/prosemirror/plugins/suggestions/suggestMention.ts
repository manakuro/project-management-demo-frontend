import { Suggester } from 'prosemirror-suggest'
import {
  onOpen,
  onClose,
  setQuery,
  getQuery,
  getId,
  onArrowDown,
  onArrowUp,
  onEnter,
  getType,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { getCaretPosition } from 'src/shared/getCaretPosition'
import { MentionAttrs } from 'src/shared/prosemirror/schema'

export const suggestMention: Suggester = {
  noDecorations: true,
  char: '@',
  name: 'mention-suggestion',
  appendText: '',
  keyBindings: {
    ArrowDown: (params) => {
      params.event.preventDefault()
      if (!params.queryText.full) return

      onArrowDown()
    },
    ArrowUp: (params) => {
      params.event.preventDefault()
      if (!params.queryText.full) return

      onArrowUp()
    },
    Enter: () => {
      onEnter()
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
      if (!getId() || !getQuery()) return

      const state = params.view.state
      const node = state.schema.nodes.mention.create({
        mentionId: String(getId()),
        mentionType: String(getType()),
      } as MentionAttrs)
      const { from, end: to } = params.match.range
      const tr = state.tr.replaceWith(from, to + getQuery().length, node)
      params.view.dispatch(tr)
    }
  },
  onExit: () => {
    onClose()
  },
}
