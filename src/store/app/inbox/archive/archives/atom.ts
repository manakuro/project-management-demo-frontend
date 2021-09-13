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

export const archiveState = atomFamily<Archive, string>({
  key: key('archiveState'),
  default: {
    id: '',
    type: 1,
    updatedAt: '',
  },
})

type ArchiveIdsSortByUpdatedAt = {
  today: string[]
  yesterday: string[]
  pastSevenDays: string[]
  earlier: string[]
}
export type ArchiveIdsSortByUpdatedAtKeys = keyof ArchiveIdsSortByUpdatedAt
export const archiveIdsSortByUpdatedAtSelector =
  selector<ArchiveIdsSortByUpdatedAt>({
    key: key('archiveIdsSortByUpdatedAtSelector'),
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

export const archiveSelector = selectorFamily<Archive, string>({
  key: key('archiveSelector'),
  get:
    (archiveId) =>
    ({ get }) =>
      get(archiveState(archiveId)),
  set:
    (archiveId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(archiveState(archiveId))
        return
      }

      set(archiveState(archiveId), newVal)
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
