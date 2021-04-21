import { history } from 'prosemirror-history'
import { baseKeys, editorKeys, listKeys } from './keys'
import { rules } from './rules'
import { Suggester, suggest } from 'prosemirror-suggest'
import {
  onOpen,
  onClose,
  setQuery,
  getQuery,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { getCaretPosition } from 'src/shared/getCaretPosition'

const suggestEmojis: Suggester = {
  noDecorations: true,
  char: '@',
  name: 'mention-suggestion',
  appendText: '',
  onChange: async (params) => {
    setQuery(params.queryText.full)
    const position = getCaretPosition()
    if (!position) return

    const value = await onOpen({
      x: Number(position?.x),
      y: Number(position?.y),
    })
    if (!value) return

    const state = params.view.state
    const node = state.schema.nodes.mention.create({
      name: value,
    })
    const { from, end: to } = params.range
    const tr = state.tr.replaceWith(from, to + getQuery().length, node)
    params.view.dispatch(tr)
  },

  onExit: () => {
    onClose()
  },
}

const suggestionPlugin = suggest(suggestEmojis)

export const plugins = [
  suggestionPlugin,
  history(),
  listKeys(),
  editorKeys(),
  baseKeys(),
  rules(),
]
