import { isBlockActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { setListTypeOrdered } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
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
