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
  getMentionQuery,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { MentionAttrs } from 'src/shared/prosemirror/schema'

export const MENTION_CHAR = '@'
export const suggestMention: Suggester = {
  noDecorations: true,
  char: MENTION_CHAR,
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
      if (!getMentionQuery()) return false

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
