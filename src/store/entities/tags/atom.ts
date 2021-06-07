import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Tag } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback, useMemo } from 'react'
import { uuid } from 'src/shared/uuid'

export const tagIdsState = atom<string[]>({
  key: 'tagIdsState',
  default: [],
})
export const tagIdsGroupByTaskState = atom<Record<string, string[]>>({
  key: 'tagIdsGroupByTaskState',
  default: {},
})
export const tagsState = atom<Tag[]>({
  key: 'tagsState',
  default: [],
})

const defaultStateValue = (): Tag => ({
  id: '',
  name: '',
  taskId: '',
  color: {
    id: '',
    name: '',
    color: '',
  },
  createdAt: '',
  updatedAt: '',
})
const tagState = atomFamily<Tag, string>({
  key: 'tagState',
  default: defaultStateValue(),
})

export const tagSelector = selectorFamily<Tag, string>({
  key: 'tagSelector',
  get:
    (tagId) =>
    ({ get }) =>
      get(tagState(tagId)),
  set:
    (tagId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(tagState(tagId))
        return
      }

      set(tagState(tagId), newVal)
      set(tagsState, (prev) =>
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

      if (get(tagIdsState).find((tagId) => tagId === newVal.id)) return

      set(tagIdsState, (prev) => [...prev, newVal.id])
      set(tagIdsGroupByTaskState, (prev) => {
        return {
          ...prev,
          [newVal.taskId]: [...(prev[newVal.taskId] || []), newVal.id],
        }
      })
    },
})

export const useTagByTask = (taskId: string) => {
  const tagIdsGroupByTask = useRecoilValue(tagIdsGroupByTaskState)
  const { upsertTag } = useTag()

  const tagIds = useMemo(() => {
    return tagIdsGroupByTask[taskId] || []
  }, [tagIdsGroupByTask, taskId])

  const addTag = useCallback(() => {
    upsertTag({
      ...defaultStateValue(),
      id: uuid(),
      taskId,
    })
  }, [taskId, upsertTag])

  return {
    tagIds,
    addTag,
  }
}

export const useTags = () => {
  const tagIds = useRecoilValue(tagIdsState)
  const tags = useRecoilValue(tagsState)

  const setTag = useRecoilCallback(
    ({ set }) =>
      (tags: Tag[]) => {
        tags.forEach((p) => {
          set(tagSelector(p.id), p)
        })
      },
    [],
  )

  return {
    tagIds,
    tags,
    setTag,
  }
}

export const useTag = (tagId?: string) => {
  const tag = useRecoilValue(tagSelector(tagId || ''))

  const upsertTag = useRecoilCallback(
    ({ set }) =>
      (tag: Tag) => {
        set(tagSelector(tag.id), tag)
      },
    [],
  )

  const setTag = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Tag>) => {
        const prev = await snapshot.getPromise(tagSelector(tag.id))
        upsertTag({
          ...prev,
          ...val,
        })
      },
    [upsertTag, tag.id],
  )

  return {
    tag,
    upsertTag,
    setTag,
  }
}
