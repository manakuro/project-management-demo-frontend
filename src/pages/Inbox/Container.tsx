import React, { useEffect } from 'react'
import { GetLayout } from 'src/@types/next'
import { useMyTasksQuery } from 'src/hooks/queries'
import { Component } from './Component'

export const Container: React.FC & GetLayout = () => {
  const { refetch, loading } = useMyTasksQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
}
