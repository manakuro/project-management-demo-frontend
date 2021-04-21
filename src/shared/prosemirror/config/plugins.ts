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
    console.log('onChange: ', params)
    setQuery(params.queryText.full)
    const position = getCaretPosition()
    if (!position) return

    const value = await onOpen({
      x: Number(position?.x),
      y: Number(position?.y),
    })
    if (!value) return

    const tr = params.view.state.tr
    const { from, end: to } = params.range

    tr.insertText(value, from, to + getQuery().length)
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
