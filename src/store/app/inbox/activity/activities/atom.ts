import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  selector,
} from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { uniqBy } from 'src/shared/utils'
import { Activity } from './type'

const key = (str: string) => `src/store/app/inbox/activity/activities/${str}`

export const activityIdsState = atom<string[]>({
  key: key('activityIdsState'),
  default: [],
})
export const activitiesState = atom<Activity[]>({
  key: key('activitiesState'),
  default: [],
})

type ActivityIdsSortByUpdatedAt = {
  today: string[]
  yesterday: string[]
  pastSevenDays: string[]
  earlier: string[]
}
export const activityIdsSortByUpdatedAtState =
  selector<ActivityIdsSortByUpdatedAt>({
    key: key('activityIdsSortByUpdatedAtState'),
    get: ({ get }) => {
      const activities = [...get(activitiesState)]
      return activities
        .sort((a, b) => {
          return a.updatedAt < b.updatedAt ? -1 : 1
        })
        .reduce<ActivityIdsSortByUpdatedAt>(
          (acc, a) => {
            const duration = dateFns.intervalToDuration({
              start: new Date(),
              end: new Date(a.updatedAt),
            })

            if (dateFns.isToday(new Date(a.updatedAt))) {
              acc.today.push(a.id)
            }
            if (dateFns.isYesterday(new Date(a.updatedAt))) {
              acc.yesterday.push(a.id)
            }
            if (duration?.days && duration.days <= 7) {
              acc.pastSevenDays.push(a.id)
            }

            if (duration?.days && duration.days > 7) {
              acc.earlier.push(a.id)
            }

            return acc
          },
          {
            today: [],
            yesterday: [],
            pastSevenDays: [],
            earlier: [],
          },
        )
    },
  })

const state = atomFamily<Activity, string>({
  key: key('state'),
  default: {
    id: '',
    type: 1,
    updatedAt: '',
  },
})
export const activityState = selectorFamily<Activity, string>({
  key: key('activityState'),
  get:
    (activityId) =>
    ({ get }) =>
      get(state(activityId)),
  set:
    (activityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(activityId))
        return
      }

      set(state(activityId), newVal)
      set(activitiesState, (prev) =>
        uniqBy([...prev, newVal], 'id').map((p) => {
          if (p.id === newVal.id) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        }),
      )

      if (get(activityIdsState).find((activityId) => activityId === newVal.id))
        return
      set(activityIdsState, (prev) => [...prev, newVal.id])
    },
})
