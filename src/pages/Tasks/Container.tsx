import React, { useEffect } from 'react'
import { Component } from './Component'
import { useMyTasksQuery } from 'src/hooks/queries'

export const Container: React.FC = () => {
  const { refetch } = useMyTasksQuery({ lazy: true })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component />
}
