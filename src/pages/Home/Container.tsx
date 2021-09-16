import React, { memo, useEffect } from 'react'
import { useHomePageQuery } from 'src/hooks/queries/app'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { refetch, loading } = useHomePageQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
