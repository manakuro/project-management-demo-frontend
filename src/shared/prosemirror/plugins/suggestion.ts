import { Suggester, suggest } from 'prosemirror-suggest'
import {
  onOpen,
  onClose,
  setQuery,
  getQuery,
  getId,
  onArrowDown,
  onArrowUp,
  onEnter,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { getCaretPosition } from 'src/shared/getCaretPosition'
import { MentionAttrs } from 'src/shared/prosemirror/schema'

const suggestEmojis: Suggester = {
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
    Enter: (params) => {
      onEnter()
      params.command()
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
    if (!getId()) return

    params.command()
  },

  createCommand: (params) => {
    return () => {
      const state = params.view.state
      const node = state.schema.nodes.mention.create({
        teammateId: String(getId()),
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

export const suggestionPlugin = suggest(suggestEmojis)
