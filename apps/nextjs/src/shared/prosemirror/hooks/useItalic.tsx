import { isMarkActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { toggleMarkItalic } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
import type { ToolbarItem } from './types';

export const useItalic = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkItalic,
      isActive: isMarkActive(schema.marks.italic),
    }),
    [],
  );
};
