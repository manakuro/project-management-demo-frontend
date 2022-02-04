import React, { useEffect, useState } from 'react'
import { GetLayout } from 'src/@types/next'
import { PageLoader } from 'src/components/molecules'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { useMyTasksPageQuery } from 'src/hooks/queries/app'
import { useTeammateTaskTabStatusQuery } from 'src/hooks/queries/entities'
import { Component } from './Component'

export const Container: React.FC & GetLayout = () => {
  const { refetch, loading } = useMyTasksPageQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
}

// Set tab status before rendering in order to prevent unnecessary tab changed
const BeforeMountComponent: React.FC = (props) => {
  const { loading: queryLoading } = useTeammateTaskTabStatusQuery()
  const [loading, setLoading] = useState(queryLoading)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return

    if (!queryLoading) {
      setLoading(queryLoading)
      setLoaded(true)
    }
  }, [loaded, queryLoading])

  if (loading) return <PageLoader />

  return <>{props.children}</>
}

Container.getLayout = (page) => {
  return (
    <LayoutDefault>
      <BeforeMountComponent>{page}</BeforeMountComponent>
    </LayoutDefault>
  )
}
