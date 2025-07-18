import { atom } from 'recoil';

const key = (str: string) => `src/store/app/globalUI/loading/${str}`;

export const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: true,
});
