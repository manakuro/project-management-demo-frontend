import { createState } from 'src/store/util';
import type { ProjectIcon } from './type';

const key = (str: string) => `src/store/entities/projectIcon/${str}`;

export const initialState = (): ProjectIcon => ({
  id: '',
  icon: {
    id: '',
    name: '',
    icon: '',
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
});
export const {
  state: projectIconState,
  listState: projectIconsState,
  idsState: projectIconIdsState,
} = createState({ key, initialState });
