import React, { SetStateAction, useEffect, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  loadingQuery: boolean
  loadingTabContent: boolean
  setLoadingTabContent: React.Dispatch<SetStateAction<boolean>>
}

type Props = {
  loading: boolean
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
  } as const
}
useValue.__PROVIDER__ = 'src/pages/Projects/Provider.tsx'
export const { Provider, useContext: useProjectsPageContext } =
  createProvider(useValue)
