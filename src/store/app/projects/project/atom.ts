import { atom } from 'recoil';

const key = (str: string) => `src/store/app/projects/project/${str}`;

export const projectIdState = atom<string>({
  key: key('projectIdState'),
  default: '',
});
