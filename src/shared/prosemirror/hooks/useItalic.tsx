import { useMemo } from 'react';
import { isMarkActive } from 'src/shared/prosemirror/commands';
import { schema } from 'src/shared/prosemirror/config';
import { toggleMarkItalic } from 'src/shared/prosemirror/config/commands';
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
