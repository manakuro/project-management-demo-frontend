import type { ArchivedActivityResponse } from 'src/graphql/types/archivedActivity';
import type { ActivityTypeCodeValues } from 'src/store/entities/activityType';
export type { ArchivedActivityResponse } from 'src/graphql/types/archivedActivity';

export type ArchiveActivity = Override<
  ArchivedActivityResponse,
  {
    type: ActivityTypeCodeValues;
  }
>;
