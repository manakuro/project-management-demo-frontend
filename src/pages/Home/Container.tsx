import React, { memo, useEffect } from 'react'
import {
  useTestUserQuery,
  useTestUserUpdatedSubscription,
} from 'src/graphql/hooks'
import { useHomePageQuery } from 'src/hooks/queries/app'
import { Component } from './Component'

export const Container: React.FC = memo(() => {
  const { refetch, loading } = useHomePageQuery({ lazy: true })

  useTestUserUpdatedSubscription({
    variables: {
      id: '0AA01FQ30NDHJB9YE6WJBX3CGNN6Y',
    },
  })
  useTestUserQuery({
    variables: {
      id: '0AA01FQ30NDHJB9YE6WJBX3CGNN6Y',
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  return <Component loading={loading} />
})
Container.displayName = 'Container'
