import { isBlockActive } from '@/shared/prosemirror/commands';
import { schema } from '@/shared/prosemirror/config';
import { setListTypeBullet } from '@/shared/prosemirror/config/commands';
import { useMemo } from 'react';
import type { ToolbarItem } from './types';

export const useBulletList = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: setListTypeBullet,
      isActive: isBlockActive(schema.nodes.list, { type: 'bullet' }),
    }),
    [],
  );
};
