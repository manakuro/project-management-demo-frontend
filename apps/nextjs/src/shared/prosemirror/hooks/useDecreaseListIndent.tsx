import { liftListItemCommand } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
import type { ToolbarItem } from './types';

export const useDecreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: liftListItemCommand,
      isEnable: liftListItemCommand,
    }),
    [],
  );
};
