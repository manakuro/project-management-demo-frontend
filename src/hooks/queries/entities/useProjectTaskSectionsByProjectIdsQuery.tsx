import { useEffect, useMemo, useState } from 'react'
import { useProjectTaskSectionsQuery as useQuery } from 'src/graphql/hooks'
import { ProjectTaskSectionsQuery } from 'src/graphql/types'
import { ProjectTaskSectionResponse } from 'src/graphql/types/projectTaskSections'
import { useMountedRef } from 'src/hooks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { useProjectTaskSectionResponse } from 'src/store/entities/projectTaskSection'

export const useProjectTaskSectionsByProjectIdsQuery = (
  projectIds: string[],
) => {
  const skip = useMemo(() => !projectIds.length, [projectIds.length])

  const queryResult = useQuery({
    variables: {
      where: {
        projectIDIn: projectIds,
      },
    },
    skip,
  })
  const { setProjectsTaskSections } = useProjectTaskSectionResponse()
  const [loading, setLoading] = useState(queryResult.loading)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    if (!queryResult.data) return
    if (queryResult.loading) return
    if (!mountedRef.current) return

    const projectTaskSections = getNodesFromEdges<
      ProjectTaskSectionResponse,
      ProjectTaskSectionsQuery['projectTaskSections']
    >(queryResult.data.projectTaskSections)

    setProjectsTaskSections(projectTaskSections)
    setLoading(false)
  }, [
    loading,
    mountedRef,
    queryResult.data,
    queryResult.loading,
    setProjectsTaskSections,
  ])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}
