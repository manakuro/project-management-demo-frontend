import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'

type Props<T> = {
  key: (str: string) => string
  initialState: () => T
  set?: (params: { newVal: T }) => void
}

type State = {
  id: string
}
export const createState = <T extends State>(props: Props<T>) => {
  const atomState = atomFamily<T, string>({
    key: props.key('atomState'),
    default: props.initialState(),
  })

  const listState = atom<T[]>({
    key: props.key('listState'),
    default: [],
  })

  const idsState = atom<string[]>({
    key: props.key('idsState'),
    default: [],
  })

  const state = selectorFamily<T, string>({
    key: props.key('state'),
    get:
      (id) =>
      ({ get }) =>
        get(atomState(id)),
    set:
      (projectId) =>
      ({ get, set, reset }, newVal) => {
        if (newVal instanceof DefaultValue) {
          reset(atomState(projectId))
          return
        }

        set(atomState(projectId), newVal)
        set(listState, (prev) =>
          uniqBy([...prev, newVal], 'id').map((p) =>
            p.id === newVal.id ? { ...p, ...newVal } : p,
          ),
        )

        if (get(idsState).find((projectId) => projectId === newVal.id)) return
        set(idsState, (prev) => [...prev, newVal.id])
        props.set?.({ newVal })
      },
  })

  return {
    state,
    listState,
    idsState,
  }
}
