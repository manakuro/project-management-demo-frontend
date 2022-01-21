import { useRecoilCallback } from 'recoil'
import { useUpdateMyTasksTabStatusMutation } from 'src/graphql/hooks'
import { tabStatusState } from '../atom'
import {
  MyTasksTabStatus,
  MyTasksTabStatusCode,
  MyTasksTabStatusCodeKey,
} from '../type'

export const useMyTasksTabStatusCommand = () => {
  const [updateMyTasksTabStatusMutation] = useUpdateMyTasksTabStatusMutation()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<MyTasksTabStatus>) => {
        set(tabStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  const setTabStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (key: MyTasksTabStatusCodeKey) => {
        const current = await snapshot.getPromise(tabStatusState)

        const input = { status: MyTasksTabStatusCode[key] }
        upsert(input)

        try {
          await updateMyTasksTabStatusMutation({
            variables: {
              input: {
                id: current.id,
                ...input,
              },
            },
          })
        } catch (err) {
          console.error(err)
          upsert(current)
          throw err
        }
      },
    [updateMyTasksTabStatusMutation, upsert],
  )

  return {
    upsert,
    setTabStatus,
  }
}
