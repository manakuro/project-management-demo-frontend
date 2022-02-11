import { useCallback, useState } from 'react'
import { useHomeTaskDetailPageLazyQuery as useQuery } from 'src/graphql/hooks'
import { HomeTaskDetailPageQueryVariables as Variables } from 'src/graphql/types/app/home'
import { useMountedRef } from 'src/hooks'
import { useTeammateTaskResponse } from 'src/store/entities/teammateTask'

export type UseHomeTaskDetailPageQueryResult = {
  refetch: (variables: Variables) => Promise<void>
  loading: boolean
}

export const useHomeTaskDetailPageQuery =
  (): UseHomeTaskDetailPageQueryResult => {
    const [loading, setLoading] = useState(true)
    const { setTeammateTask } = useTeammateTaskResponse()
    const { mountedRef } = useMountedRef()

    const [refetchQuery] = useQuery({
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        if (!mountedRef.current) return

        if (data.teammateTask) setTeammateTask([data.teammateTask])
        endLoading()
      },
    })

    const startLoading = useCallback(() => {
      setLoading(true)
    }, [])

    const endLoading = useCallback(() => {
      setLoading(false)
    }, [])

    const refetch = useCallback(
      async (variables: Variables) => {
        startLoading()
        setTimeout(async () => {
          await refetchQuery({
            variables: variables,
          })
        })
      },
      [refetchQuery, startLoading],
    )

    return {
      refetch,
      loading,
    }
  }
