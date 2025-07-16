import { useMemo } from 'react';
import { isBlockActive } from 'src/shared/prosemirror/commands';
import { schema } from 'src/shared/prosemirror/config';
import { setListTypeOrdered } from 'src/shared/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useOrderedList = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: setListTypeOrdered,
      isActive: isBlockActive(schema.nodes.list, { type: 'ordered' }),
    }),
    [],
  );
};
