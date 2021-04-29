import { Suggester } from 'prosemirror-suggest'
import {
  onMentionOpen as onOpen,
  onMentionClose as onClose,
  setMentionQuery as setQuery,
  getMentionQuery as getQuery,
  getMentionId,
  onMentionArrowDown as onArrowDown,
  onMentionArrowUp as onArrowUp,
  onMentionEnter as onEnter,
  getMentionType,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { getCaretPosition } from 'src/shared/getCaretPosition'
import { MentionAttrs } from 'src/shared/prosemirror/schema'

export const suggestMention: Suggester = {
  noDecorations: true,
  char: '@',
  name: 'mention-suggestion',
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
      return true
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
      if (!getMentionId() || !getQuery()) return

      const state = params.view.state
      const node = state.schema.nodes.mention.create({
        mentionId: String(getMentionId()),
        mentionType: String(getMentionType()),
      } as MentionAttrs)
      const { from, end: to } = params.match.range
      const tr = state.tr.replaceWith(from, to, node)
      params.view.dispatch(tr)
    }
  },
  onExit: () => {
    onClose()
  },
}
