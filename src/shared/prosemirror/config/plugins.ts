import {
  suggestionPlugin,
  rules,
  history,
  editorKeys,
  baseKeys,
  listKeys,
} from 'src/shared/prosemirror/plugins'

export const plugins = () => [
  suggestionPlugin(),
  history(),
  listKeys(),
  editorKeys(),
  baseKeys(),
  rules(),
]
