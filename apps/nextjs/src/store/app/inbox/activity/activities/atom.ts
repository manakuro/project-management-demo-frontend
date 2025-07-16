import { selector } from 'recoil';
import { dateFns } from 'src/shared/dateFns';
import { ActivityTypeCode } from 'src/store/entities/activityType';
import { createState } from 'src/store/util';
import type { Activity } from './type';

const key = (str: string) => `src/store/app/inbox/activity/activities/${str}`;

export const initialState = (): Activity => ({
  id: '',
  type: ActivityTypeCode.Task,
  updatedAt: '',
});
export const {
  state: activityState,
  listState: activitiesState,
  idsState: activityIdsState,
} = createState({ key, initialState });

type ActivityIdsSortByUpdatedAt = {
  today: string[];
  yesterday: string[];
  pastSevenDays: string[];
  earlier: string[];
};
export const activityIdsSortByUpdatedAtState =
  selector<ActivityIdsSortByUpdatedAt>({
    key: key('activityIdsSortByUpdatedAtState'),
    get: ({ get }) => {
      const activities = [...get(activitiesState)];
      return activities
        .sort((a, b) => {
          return a.updatedAt < b.updatedAt ? -1 : 1;
        })
        .reduce<ActivityIdsSortByUpdatedAt>(
          (acc, a) => {
            const duration = dateFns.intervalToDuration({
              start: new Date(),
              end: new Date(a.updatedAt),
            });

            if (dateFns.isToday(new Date(a.updatedAt))) {
              acc.today.push(a.id);
              return acc;
            }
            if (dateFns.isYesterday(new Date(a.updatedAt))) {
              acc.yesterday.push(a.id);
              return acc;
            }
            if (duration?.days && duration.days <= 7) {
              acc.pastSevenDays.push(a.id);
              return acc;
            }

            if (duration?.days && duration.days > 7) {
              acc.earlier.push(a.id);
            }

            return acc;
          },
          {
            today: [],
            yesterday: [],
            pastSevenDays: [],
            earlier: [],
          },
        );
    },
  });
