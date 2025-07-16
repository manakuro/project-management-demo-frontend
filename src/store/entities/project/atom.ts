import { getDefaultDescription } from 'src/shared/prosemirror/getDefaultDescription';
import { createState } from '../../util';
import type { Project } from './type';

const key = (str: string) => `src/store/entities/project/${str}`;

const initialState = (): Project => ({
  id: '',
  name: '',
  projectBaseColorId: '',
  projectLightColorId: '',
  projectIconId: '',
  teammateIds: [],
  description: getDefaultDescription(),
  descriptionTitle: '',
  dueDate: '',
  createdBy: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: projectState,
  listState: projectsState,
  idsState: projectIdsState,
} = createState({ key, initialState });
