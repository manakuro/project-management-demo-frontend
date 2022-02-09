import React, { memo } from 'react'
import { useHomePageQuery } from 'src/hooks/queries/app'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { loading } = useHomePageQuery()

  return <Component loading={loading} />
})

Container.displayName = 'Container'
