import { createState } from 'src/store/util';
import type { ProjectLightColor } from './type';

const key = (str: string) => `src/store/entities/projectLightColor/${str}`;

export const initialState = (): ProjectLightColor => ({
  id: '',
  color: {
    id: '',
    name: '',
    color: '',
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
});
export const {
  state: projectLightColorState,
  listState: projectLightColorsState,
  idsState: projectLightColorIdsState,
} = createState({ key, initialState });
