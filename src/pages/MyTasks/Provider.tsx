import React, { SetStateAction, useEffect, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  loadingQuery: boolean
  loadingTabContent: boolean
  setLoadingTabContent: React.Dispatch<SetStateAction<boolean>>
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>
}

type Props = {
  loading: boolean
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>
}

const useValue = (props: Props): ContextProps => {
  const [loadingQuery, setLoadingQuery] = useState(props.loading)
  const [loadingTabContent, setLoadingTabContent] = useState(props.loading)

  useEffect(() => {
    setLoadingQuery(props.loading)
    setLoadingTabContent(props.loading)
  }, [props.loading])

  return {
    loadingQuery,
    loadingTabContent,
    setLoadingTabContent,
    fetchTaskDetailQuery: props.fetchTaskDetailQuery,
  } as const
}
useValue.__PROVIDER__ = 'src/pages/MyTasks/Provider.tsx'
export const { Provider, useContext: useMyTasksContext } =
  createProvider(useValue)
