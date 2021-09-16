import React, { useEffect, useState } from 'react'
import { GetLayout } from 'src/@types/next'
import { PageLoader } from 'src/components/molecules'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { useMyTasksQuery, useTabStatusForMyTasksQuery } from 'src/hooks/queries'
import { Component } from './Component'

export const Container: React.FC & GetLayout = () => {
  const { refetch, loading } = useMyTasksQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
}

const BeforeMountComponent: React.FC = (props) => {
  const { loading: queryLoading } = useTabStatusForMyTasksQuery({ lazy: true })
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
