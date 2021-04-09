import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

export type ToolbarItem<S extends Schema = any> = {
  action: (
    state: EditorState<S>,
    dispatch: (tr: Transaction<S>) => void,
    view: EditorView,
  ) => boolean
  isActive: (state: EditorState<S>) => boolean
}
