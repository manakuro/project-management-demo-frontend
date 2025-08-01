import { isMarkActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { toggleMarkBold } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
import type { ToolbarItem } from './types';

export const useBold = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkBold,
      isActive: isMarkActive(schema.marks.bold),
    }),
    [],
  );
};
