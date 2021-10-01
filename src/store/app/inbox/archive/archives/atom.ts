import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  selector,
} from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { uniqBy } from 'src/shared/utils'
import { Archive } from './type'

const key = (str: string) => `src/store/app/inbox/archive/archives/${str}`

export const archiveIdsState = atom<string[]>({
  key: key('archiveIdsState'),
  default: [],
})
export const archivesState = atom<Archive[]>({
  key: key('archivesState'),
  default: [],
})

type ArchiveIdsSortByUpdatedAt = {
  today: string[]
  yesterday: string[]
  pastSevenDays: string[]
  earlier: string[]
}
export type ArchiveIdsSortByUpdatedAtKeys = keyof ArchiveIdsSortByUpdatedAt

export const archiveIdsSortByUpdatedAtState =
  selector<ArchiveIdsSortByUpdatedAt>({
    key: key('archiveIdsSortByUpdatedAtState'),
    get: ({ get }) => {
      const archives = [...get(archivesState)]
      return archives
        .sort((a, b) => {
          return a.updatedAt < b.updatedAt ? -1 : 1
        })
        .reduce<ArchiveIdsSortByUpdatedAt>(
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

const state = atomFamily<Archive, string>({
  key: key('state'),
  default: {
    id: '',
    type: 1,
    updatedAt: '',
  },
})

export const archiveState = selectorFamily<Archive, string>({
  key: key('archiveState'),
  get:
    (archiveId) =>
    ({ get }) =>
      get(state(archiveId)),
  set:
    (archiveId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(archiveId))
        return
      }

      set(state(archiveId), newVal)
      set(archivesState, (prev) =>
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

      if (get(archiveIdsState).find((archiveId) => archiveId === newVal.id))
        return
      set(archiveIdsState, (prev) => [...prev, newVal.id])
    },
})
