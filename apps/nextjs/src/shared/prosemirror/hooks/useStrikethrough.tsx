import { useMemo } from 'react';
import { isMarkActive } from 'src/shared/prosemirror/commands';
import { schema } from 'src/shared/prosemirror/config';
import { toggleMarkStrikethrough } from 'src/shared/prosemirror/config/commands';
import type { ToolbarItem } from './types';

export const useStrikethrough = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleMarkStrikethrough,
      isActive: isMarkActive(schema.marks.strikethrough),
    }),
    [],
  );
};
