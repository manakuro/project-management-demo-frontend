import React, { useEffect } from 'react'
import { Component } from './Component'
import { useMyTasksQuery } from 'src/hooks/queries'
import { useTasksListDetail } from 'src/components/organisms'
import { isTaskDetailURL, useRouter } from 'src/router'

export const Container: React.FC = () => {
  const { refetch } = useMyTasksQuery({ lazy: true })
  const { onOpen } = useTasksListDetail()
  const { router } = useRouter()

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!isTaskDetailURL(router)) return
    onOpen()
  }, [router, onOpen])

  return <Component />
}
