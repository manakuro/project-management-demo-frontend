import { isMarkActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { toggleMarkUnderline } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
import type { ToolbarItem } from './types';

export const useUnderline = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkUnderline,
      isActive: isMarkActive(schema.marks.underline),
    }),
    [],
  );
};
