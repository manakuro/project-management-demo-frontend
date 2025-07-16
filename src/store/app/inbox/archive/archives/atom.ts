import { selector } from 'recoil'
import { dateFns } from 'src/shared/dateFns'
import { createState } from 'src/store/util'
import type { ArchiveActivity } from './type'

const key = (str: string) => `src/store/app/inbox/archive/archives/${str}`

export const initialState = (): ArchiveActivity => ({
  id: '',
  type: 'TASK',
  updatedAt: '',
})
export const {
  state: archiveState,
  listState: archivesState,
  idsState: archiveIdsState,
} = createState({ key, initialState })

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
              return acc
            }
            if (dateFns.isYesterday(new Date(a.updatedAt))) {
              acc.yesterday.push(a.id)
              return acc
            }
            if (duration?.days && duration.days <= 7) {
              acc.pastSevenDays.push(a.id)
              return acc
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
