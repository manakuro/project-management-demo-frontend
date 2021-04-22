import {
  baseKeymap,
  chainCommands,
  exitCode,
  joinDown,
  joinUp,
  lift,
  selectParentNode,
} from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'

import {
  insertNodeHorizontalRule,
  insertNodeLineBreak,
  setListTypeBullet,
  setListTypeOrdered,
  liftListItemCommand,
  sinkListItemCommand,
  splitListItemCommand,
  toggleMarkBold,
  toggleMarkCode,
  toggleMarkItalic,
  toggleMarkUnderline,
  wrapInBlockquote,
  toggleMarkStrikethrough,
} from '../config/commands'

export const listKeys = (): Plugin =>
  keymap({
    'Mod-]': sinkListItemCommand,
    'Mod-[': liftListItemCommand,
    Tab: sinkListItemCommand,
    'Shift-Tab': liftListItemCommand,
    Enter: splitListItemCommand,
  })

// TODO: sink/lift headings

export const editorKeys = (): Plugin =>
  keymap({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    Backspace: undoInputRule,
    'Mod-y': redo,
    'Alt-ArrowUp': joinUp,
    'Alt-ArrowDown': joinDown,
    'Mod-BracketLeft': lift,
    Escape: selectParentNode,
    'Shift-Mod-8': setListTypeBullet,
    'Shift-Mod-7': setListTypeOrdered,
    'Mod-b': toggleMarkBold,
    'Mod-i': toggleMarkItalic,
    'Ctrl-`': toggleMarkCode,
    'Mod-u': toggleMarkUnderline,
    'Shift-Mod-s': toggleMarkStrikethrough,
    'Ctrl->': wrapInBlockquote,
    'Mod-Enter': chainCommands(exitCode, insertNodeLineBreak),
    'Shift-Enter': chainCommands(exitCode, insertNodeLineBreak),
    'Ctrl-Enter': chainCommands(exitCode, insertNodeLineBreak), // mac-only?
    'Mod-_': insertNodeHorizontalRule,
  })

export const baseKeys = (): Plugin => keymap(baseKeymap)
