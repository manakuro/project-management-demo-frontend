import type { Node as ProsemirrorNode, Schema } from 'prosemirror-model';

export interface ProsemirrorTransformer<T = any, S extends Schema = any> {
  parse: (input: T) => ProsemirrorNode<S>;
  serialize: (doc: ProsemirrorNode) => T;
}
