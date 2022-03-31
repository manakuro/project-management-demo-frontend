import { useEffect, useMemo, useState } from 'react'
import { useTaskQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useTasksResponse } from 'src/store/entities/task'
import { TaskResponse } from 'src/store/entities/task'

export const useTaskQuery = (taskId: string) => {
  const queryResult = useQuery({
    variables: {
      where: {
        id: taskId,
      },
    },
  })
  const { setTasksFromResponse } = useTasksResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  const task = useMemo<TaskResponse | null>(
    () => queryResult.data?.task || null,
    [queryResult.data?.task],
  )

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return
    if (!queryResult.data.task) return

    setTasksFromResponse([queryResult.data.task])
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setTasksFromResponse])

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
    task,
  }
}
