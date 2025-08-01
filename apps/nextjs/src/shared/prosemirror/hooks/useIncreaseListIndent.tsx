import { sinkListItemCommand } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
import type { ToolbarItem } from './types';

export const useIncreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: sinkListItemCommand,
      isEnable: sinkListItemCommand,
    }),
    [],
  );
};
