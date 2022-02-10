import React, { memo, useEffect } from 'react'
import { useProjectsPageQuery } from 'src/hooks/queries/app'
import { useRouter } from 'src/router'
import { getProjectsIdFromURL } from 'src/router/projects'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { router } = useRouter()
  const { projectId, setProjectId } = useProjectsProjectId()
  const { loading, startLoading } = useProjectsPageQuery({ projectId })

  useEffect(() => {
    const id = getProjectsIdFromURL(router)
    if (!id) return
    if (projectId === id) return

    console.log('projectId: ', id)
    startLoading()
    setProjectId(id)
  }, [router, setProjectId, startLoading, projectId])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
