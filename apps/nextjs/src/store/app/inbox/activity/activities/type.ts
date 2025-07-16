import type { ActivityResponse as Response } from 'src/graphql/types/activity';
import type { ActivityTypeCodeValues } from 'src/store/entities/activityType';

export type { ActivityResponse } from 'src/graphql/types/activity';
export type Activity = Override<
  Response,
  {
    type: ActivityTypeCodeValues;
  }
>;
