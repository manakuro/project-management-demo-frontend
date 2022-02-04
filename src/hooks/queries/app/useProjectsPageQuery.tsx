import { useEffect, useMemo, useState } from 'react'
import { useProjectsPageQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useProjectsResponse } from 'src/store/app/projects'

type Props = {
  projectId: string
}

export const useProjectsPageQuery = (props: Props) => {
  const skip = useMemo(() => !props.projectId, [])
  const [loading, setLoading] = useState(true)
  const { setProjects } = useProjectsResponse()
  const { mountedRef } = useMountedRef()

  const queryResult = useQuery({
    variables: {
      projectId: props.projectId,
    },
    skip,
  })

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    setProjects(queryResult.data)
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setProjects])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
