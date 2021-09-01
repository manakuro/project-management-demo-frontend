import React, { memo, useEffect } from 'react'
import { useHomeQuery } from 'src/hooks/queries/useHomeQuery'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { refetch, loading } = useHomeQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
