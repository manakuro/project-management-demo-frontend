import React, { SetStateAction, useEffect, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  queryLoading: boolean
  tabContentLoading: boolean
  listContentLoading: boolean
  setTabContentLoading: React.Dispatch<SetStateAction<boolean>>
  setListContentLoading: React.Dispatch<SetStateAction<boolean>>
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>
}

type Props = {
  loading: boolean
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>
}

const useValue = (props: Props): ContextProps => {
  const [queryLoading, setQueryLoading] = useState(props.loading)
  const [tabContentLoading, setTabContentLoading] = useState(props.loading)
  const [listContentLoading, setListContentLoading] = useState(false)

  useEffect(() => {
    setQueryLoading(props.loading)
    setTabContentLoading(props.loading)
  }, [props.loading])

  return {
    queryLoading,
    tabContentLoading,
    listContentLoading,
    setTabContentLoading,
    setListContentLoading,
    fetchTaskDetailQuery: props.fetchTaskDetailQuery,
  } as const
}
useValue.__PROVIDER__ = 'src/pages/MyTasks/Provider.tsx'
export const { Provider, useContext: useMyTasksContext } =
  createProvider(useValue)
