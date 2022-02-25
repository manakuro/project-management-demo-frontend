import { useRecoilCallback } from 'recoil'
import { useUpdateTeammateTaskColumnMutation } from 'src/graphql/hooks'
import { teammateTaskColumnState } from '../atom'
import { TeammateTaskColumn } from '../type'
import { useUpsert } from './useUpsert'

export const useTeammateTaskColumnCommand = () => {
  const { upsert } = useUpsert()
  const [updateTeammateTaskColumnMutation] =
    useUpdateTeammateTaskColumnMutation()

  const setTeammateTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TeammateTaskColumn> & { id: string }) => {
        const prev = await snapshot.getPromise(teammateTaskColumnState(val.id))
        upsert({ ...prev, ...val })

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
          upsert(prev)
        }
      },
    [updateTeammateTaskColumnMutation, upsert],
  )

  const setTeammateTaskColumnOrder = useRecoilCallback(
    () => (ids: string[]) => {
      ids.forEach((id, index) => {
        upsert({
          id,
          order: index,
        })
      })
    },
    [upsert],
  )

  return {
    setTeammateTaskColumn,
    setTeammateTaskColumnOrder,
  }
}
