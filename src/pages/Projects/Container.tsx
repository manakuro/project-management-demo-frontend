import type React from 'react'
import { memo, useCallback, useEffect } from 'react'
import {
  useProjectsPageQuery,
  useProjectsTaskDetailPageQuery,
} from 'src/hooks/queries/app'
import { useRouter } from 'src/router'
import { getProjectsIdFromURL } from 'src/router/projects'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { router } = useRouter()
  const { projectId, setProjectId } = useProjectsProjectId()
  const { loading, startLoading } = useProjectsPageQuery({ projectId })
  const { refetch: refetchProjectsTaskDetailPageQuery } =
    useProjectsTaskDetailPageQuery()

  useEffect(() => {
    const id = getProjectsIdFromURL(router)
    if (!id) return
    if (projectId === id) return

    console.log('projectId: ', id)
    startLoading()
    setProjectId(id)
  }, [router, setProjectId, startLoading, projectId])

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetchProjectsTaskDetailPageQuery({
        taskId: variables.taskId,
        projectId: projectId,
      })
    },
    [projectId, refetchProjectsTaskDetailPageQuery],
  )

  return (
    <Component loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery} />
  )
})
Container.displayName = 'Container'
