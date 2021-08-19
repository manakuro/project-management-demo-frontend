import React, { useEffect } from 'react'
import { GetLayout } from 'src/@types/next'
import { PageLoader } from 'src/components/molecules'
import { LayoutDefault } from 'src/components/organisms'
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
  const { loading } = useTabStatusForMyTasksQuery({ lazy: true })

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
