import { atom } from 'recoil';
import { getDefaultDescription } from 'src/shared/prosemirror/getDefaultDescription';
import type { Workspace } from './type';

const key = (str: string) => `src/store/entities/workspace/${str}`;

export const workspaceStateDefault = (): Workspace => ({
  id: '',
  name: '',
  description: getDefaultDescription(),
  createdBy: '',
  createdAt: '',
  updatedAt: '',
});

export const workspaceState = atom<Workspace>({
  key: key('workspaceState'),
  default: workspaceStateDefault(),
});
