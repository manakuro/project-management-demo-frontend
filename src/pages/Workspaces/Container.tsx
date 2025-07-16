import type React from 'react'
import { memo } from 'react'
import { useWorkspacePageQuery } from 'src/hooks/queries/app'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { loading } = useWorkspacePageQuery()

  return <Component loading={loading} />
})
Container.displayName = 'Container'
