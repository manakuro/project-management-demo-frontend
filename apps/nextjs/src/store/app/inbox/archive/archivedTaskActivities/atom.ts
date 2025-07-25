import { createState } from 'src/store/util';
import type { ArchivedTaskActivity } from './type';

export const initialState = (): ArchivedTaskActivity => ({
  id: '',
  activityTypeId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
});

export const {
  state: archivedTaskActivityState,
  listState: archivedTaskActivitiesState,
  idsState: archivedTaskActivityIdsState,
} = createState({ initialState });
