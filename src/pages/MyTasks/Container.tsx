import React, { useEffect } from 'react'
import { useTasksListDetail } from 'src/components/organisms'
import { useMyTasksQuery } from 'src/hooks/queries'
import { Component } from './Component'

export const Container: React.FC = () => {
  const { refetch, loading } = useMyTasksQuery({ lazy: true })
  useTasksListDetail({
    listenRouter: true,
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
}
