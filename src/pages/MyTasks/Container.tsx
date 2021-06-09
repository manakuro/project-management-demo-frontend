import React, { useEffect } from 'react'
import { Component } from './Component'
import { useMyTasksQuery } from 'src/hooks/queries'
import { useTasksListDetail } from 'src/components/organisms'

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
