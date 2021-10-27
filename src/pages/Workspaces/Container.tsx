import React, { memo, useEffect } from 'react'
import { useWorkspacePageQuery } from 'src/hooks/queries/app'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { refetch, loading } = useWorkspacePageQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
