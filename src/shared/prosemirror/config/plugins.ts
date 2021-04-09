import { history } from 'prosemirror-history'
import { baseKeys, editorKeys, listKeys } from './keys'
import { rules } from './rules'

export const plugins = [
  history(),
  listKeys(),
  editorKeys(),
  baseKeys(), // last
  rules(),
]

// document.execCommand('enableObjectResizing', false, 'false')
// document.execCommand('enableInlineTableEditing', false, 'false')
