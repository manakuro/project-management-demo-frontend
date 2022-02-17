import { useRecoilCallback } from 'recoil'
import { useUpdateTeammateTaskTabStatusMutation } from 'src/graphql/hooks'
import { tabStatusState } from '../atom'
import {
  TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  TeammateTaskTabStatusCodeKey,
} from '../type'

export const useTeammateTaskTabStatusCommand = () => {
  const [updateTeammateTaskTabStatusMutation] =
    useUpdateTeammateTaskTabStatusMutation()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TeammateTaskTabStatus>) => {
        set(tabStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  const setTabStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (key: TeammateTaskTabStatusCodeKey) => {
        const current = await snapshot.getPromise(tabStatusState)

        const input: Partial<TeammateTaskTabStatus> = {
          statusCode: TeammateTaskTabStatusCode[key],
        }
        upsert(input)

        try {
          await updateTeammateTaskTabStatusMutation({
            variables: {
              input: {
                id: current.id,
                requestId: '',
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
    [updateTeammateTaskTabStatusMutation, upsert],
  )

  return {
    upsert,
    setTabStatus,
  }
}
