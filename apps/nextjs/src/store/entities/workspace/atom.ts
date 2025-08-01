import { getDefaultDescription } from '@/shared/prosemirror/getDefaultDescription';
import { atom } from 'jotai';
import type { Workspace } from './type';

export const workspaceStateDefault = (): Workspace => ({
  id: '',
  name: '',
  description: getDefaultDescription(),
  createdBy: '',
  createdAt: '',
  updatedAt: '',
});

export const workspaceState = atom<Workspace>(workspaceStateDefault());
