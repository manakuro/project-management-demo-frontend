import { useRecoilCallback } from 'recoil'
import {
  useUpdateTeammateTaskColumnMutation,
  useUpdateTeammateTaskColumnOrderMutation,
} from 'src/graphql/hooks'
import { teammateTaskColumnsState, teammateTaskColumnState } from '../atom'
import { TeammateTaskColumn } from '../type'
import { useUpsert } from './useUpsert'

export const useTeammateTaskColumnCommand = () => {
  const { upsert } = useUpsert()
  const [updateTeammateTaskColumnMutation] =
    useUpdateTeammateTaskColumnMutation()
  const [updateTeammateTaskColumnOrderMutation] =
    useUpdateTeammateTaskColumnOrderMutation()

  const setTeammateTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTaskColumn> & { id: string }) => {
        const prev = await snapshot.getPromise(teammateTaskColumnState(val.id))
        upsert({ ...prev, ...val })

        const restore = () => {
          upsert(prev)
        }

        try {
          const res = await updateTeammateTaskColumnMutation({
            variables: {
              input: {
                ...val,
                id: prev.id,
                requestId: '',
              },
            },
          })
          if (res.errors) {
            restore()
          }
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateTeammateTaskColumnMutation, upsert],
  )

  const setTeammateTaskColumnOrder = useRecoilCallback(
    ({ snapshot }) =>
      async (ids: string[]) => {
        const prev = await snapshot.getPromise(teammateTaskColumnsState)
        const prevIds = prev.map((p) => p.id)

        if (JSON.stringify(prevIds) === JSON.stringify(ids)) return

        ids.forEach((id, index) => {
          upsert({
            id,
            order: index,
          })
        })

        const restore = () => {
          prevIds.forEach((id, index) => {
            upsert({
              id,
              order: index,
            })
          })
        }

        try {
          const res = await updateTeammateTaskColumnOrderMutation({
            variables: {
              input: {
                ids,
              },
            },
          })
          if (res.errors) {
            restore()
          }
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateTeammateTaskColumnOrderMutation, upsert],
  )

  return {
    setTeammateTaskColumn,
    setTeammateTaskColumnOrder,
  }
}
