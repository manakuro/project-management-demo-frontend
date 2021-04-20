import { history } from 'prosemirror-history'
import { baseKeys, editorKeys, listKeys } from './keys'
import { rules } from './rules'
import { Suggester, suggest } from 'prosemirror-suggest'
import { onOpen } from 'src/components/organisms/Modals/EditorMentionModal'
import { getCaretPosition } from 'src/shared/getCaretPosition'

let selectedIndex = 0
let emojiList: string[] = []
let showSuggestions = false

const suggestEmojis: Suggester = {
  noDecorations: true,
  char: '@', // The character to match against
  name: 'emoji-suggestion', // a unique name
  appendText: '', // Text to append to the created match

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
    const position = getCaretPosition()
    if (!position) return

    onOpen({
      x: Number(position?.x),
      y: Number(position?.y),
    })
    // emojiList = sortEmojiMatches({ query, maxResults })
    // selectedIndex = 0
    // showSuggestions = true
  },

  onExit: () => {
    console.log('onExit: ')
    showSuggestions = false
    emojiList = []
    selectedIndex = 0
  },

  // Create a  function that is passed into the change, exit and keybinding handlers.
  // This is useful when these handlers are called in a different part of the app.
  createCommand: ({ match, view }) => {
    return (emoji, skinVariation) => {
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
