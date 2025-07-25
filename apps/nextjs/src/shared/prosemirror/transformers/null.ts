import type { Node as ProsemirrorNode } from 'prosemirror-model';

import type { ProsemirrorTransformer } from './types';

export const createNullTransformer =
  (): ProsemirrorTransformer<ProsemirrorNode> => {
    return {
      parse: (doc) => doc,
      serialize: (doc) => doc,
    };
  };
