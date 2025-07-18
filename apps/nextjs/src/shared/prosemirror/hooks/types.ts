import type { Schema } from 'prosemirror-model';
import type { EditorState, Transaction } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';

export type ToolbarItem<S extends Schema = any> = {
  action: (
    state: EditorState<S>,
    dispatch: (tr: Transaction<S>) => void,
    view: EditorView,
  ) => boolean | Promise<boolean>;
  isActive?: (state: EditorState<S>) => boolean;
  isEnable?: (state: EditorState<S>) => boolean;
};
