import { useRecoilCallback } from 'recoil'
import { useUpdateTeammateTaskTabStatusMutation } from 'src/graphql/hooks'
import { tabStatusState } from '../atom'
import {
  TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  TeammateTaskTabStatusCodeKey,
} from '../type'
import { useUpsert } from './useUpsert'

export const useTeammateTaskTabStatusCommand = () => {
  const [updateTeammateTaskTabStatusMutation] =
    useUpdateTeammateTaskTabStatusMutation()
  const { upsert } = useUpsert()

  const setTabStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (key: TeammateTaskTabStatusCodeKey) => {
        const prev = await snapshot.getPromise(tabStatusState)

        const input: Partial<TeammateTaskTabStatus> = {
          statusCode: TeammateTaskTabStatusCode[key],
        }
        upsert(input)

        const res = await updateTeammateTaskTabStatusMutation({
          variables: {
            input: {
              id: prev.id,
              requestId: '',
              ...input,
            },
          },
        })
        if (res.errors) {
          upsert(prev)
        }
      },
    [updateTeammateTaskTabStatusMutation, upsert],
  )

  return {
    setTabStatus,
  }
}
