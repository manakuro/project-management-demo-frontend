import React, { memo, useEffect } from 'react'
import { useProjectsPageQuery } from 'src/hooks/queries/app'
import { useRouter } from 'src/router'
import { getProjectsIdFromURL } from 'src/router/projects'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { router } = useRouter()
  const { projectId, setProjectId } = useProjectsProjectId()
  const { refetch, loading, startLoading } = useProjectsPageQuery({ projectId })

  useEffect(() => {
    const projectId = getProjectsIdFromURL(router)
    console.log('projectId: ', projectId)
    if (!projectId) return

    startLoading()
    setProjectId(projectId)
  }, [refetch, router, setProjectId, startLoading])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
