import { MarkType } from 'prosemirror-model'
import { Command, toggleMark } from 'prosemirror-commands'
import { EditorState, Transaction } from 'prosemirror-state'

export const toggleMarkCommand = (mark: MarkType): Command => {
  return (
    state: EditorState,
    dispatch: ((tr: Transaction) => void) | undefined,
  ) => toggleMark(mark)(state, dispatch)
}

// https://github.com/ProseMirror/prosemirror-example-setup/blob/afbc42a68803a57af3f29dd93c3c522c30ea3ed6/src/menu.js#L57-L61
export const isMarkActive = (state: EditorState, mark: MarkType): boolean => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? !!mark.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, mark)
}
