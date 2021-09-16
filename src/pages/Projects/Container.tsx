import React, { memo, useEffect } from 'react'
import { useProjectsPageQuery } from 'src/hooks/queries'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { refetch, loading } = useProjectsPageQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
