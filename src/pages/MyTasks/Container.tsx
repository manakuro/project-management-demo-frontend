import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import type { GetLayout } from 'src/@types/next'
import { PageLoader } from 'src/components/ui/molecules'
import { LayoutDefault } from 'src/components/ui/organisms/Layout'
import {
  useMyTasksDetailPageQuery,
  useMyTasksPageQuery,
} from 'src/hooks/queries/app'
import { useTeammateTaskTabStatusQuery } from 'src/hooks/queries/entities'
import { useMe } from 'src/store/entities/me'
import { Component } from './Component'

export const Container: React.FC & GetLayout = () => {
  const { loading } = useMyTasksPageQuery()
  const { refetch } = useMyTasksDetailPageQuery()
  const { me } = useMe()

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id })
    },
    [me.id, refetch],
  )

  return (
    <Component loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery} />
  )
}

// Set tab status before rendering in order to prevent unnecessary tab changed
const BeforeMountComponent: React.FCWithChildren = (props) => {
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
