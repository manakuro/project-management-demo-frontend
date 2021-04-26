import React, { useEffect } from 'react'
import { Component } from './Component'
import { useMyTasksQuery } from 'src/hooks/queries'

export const Container: React.FC = () => {
  const myTasksQueryResult = useMyTasksQuery({ lazy: true })

  useEffect(() => {
    myTasksQueryResult.refetch()
  }, [myTasksQueryResult])

  return <Component />
}
