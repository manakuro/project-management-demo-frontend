import React, { SetStateAction, useEffect, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  loadingHeader: boolean
  loadingPage: boolean
  setLoadingPage: React.Dispatch<SetStateAction<boolean>>
}

type Props = {
  loading: boolean
}

const useValue = (props: Props): ContextProps => {
  const [loadingHeader, setLoadingHeader] = useState(props.loading)
  const [loadingPage, setLoadingPage] = useState(props.loading)

  useEffect(() => {
    setLoadingHeader(props.loading)
    setLoadingPage(props.loading)
  }, [props.loading])

  return {
    loadingHeader,
    loadingPage,
    setLoadingPage,
  } as const
}
useValue.__PROVIDER__ = 'src/pages/MyTasks/Provider.tsx'
export const { Provider, useContext: useMyTasksContext } =
  createProvider(useValue)
