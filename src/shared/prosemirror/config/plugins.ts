import { history } from 'prosemirror-history'
import { baseKeys, editorKeys, listKeys } from './keys'
import { rules } from './rules'
import { Suggester, suggest } from 'prosemirror-suggest'
import {
  onOpen,
  onClose,
  setQuery,
} from 'src/components/organisms/Menus/EditorMentionMenu'
import { getCaretPosition } from 'src/shared/getCaretPosition'

let selectedIndex = 0
let emojiList: string[] = []
let showSuggestions = false

const suggestEmojis: Suggester = {
  noDecorations: true,
  char: '@',
  name: 'mention-suggestion',
  appendText: '',

  keyBindings: {
    // ArrowUp: () => {
    //   selectedIndex = rotateSelectionBackwards(selectedIndex, emojiList.length)
    // },
    // ArrowDown: () => {
    //   selectedIndex = rotateSelectionForwards(selectedIndex, emojiList.length)
    // },
    Enter: ({ command }) => {
      if (showSuggestions) {
        command(emojiList[selectedIndex])
      }
    },
    Esc: () => {
      showSuggestions = false
    },
  },

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

    const { tr } = params.view.state
    tr.insertText(value)
    params.view.dispatch?.(tr)
  },

  onExit: () => {
    onClose()
  },

  // Create a  function that is passed into the change, exit and keybinding handlers.
  // This is useful when these handlers are called in a different part of the app.
  createCommand: ({ match, view }) => {
    return (emoji) => {
      if (!emoji) {
        throw new Error(
          'An emoji is required when calling the emoji suggestions command',
        )
      }

      const tr = view.state.tr
      const { from, end: to } = match.range
      tr.insertText(emoji, from, to)
      view.dispatch(tr)
    }
  },
}

// Create the plugin with the above configuration. It also supports multiple plugins being added.
const suggestionPlugin = suggest(suggestEmojis)

export const plugins = [
  suggestionPlugin,
  history(),
  listKeys(),
  editorKeys(),
  baseKeys(), // last
  rules(),
]
