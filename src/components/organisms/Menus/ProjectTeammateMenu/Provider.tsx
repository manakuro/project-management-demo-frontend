import { useCallback, useMemo, useState } from 'react'
import { useSearchProjectTeammatesQuery } from 'src/components/organisms/Menus/ProjectTeammateMenu/useSearchProjectTeammatesQuery'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {}

const useValue = (): ContextProps => {
  const {
    refetch,
    teammates,
    loading: loadingQuery,
  } = useSearchProjectTeammatesQuery()
  const [loadingText, setLoadingText] = useState<boolean>(false)
  const loading = useMemo(
    () => loadingText || loadingQuery,
    [loadingQuery, loadingText],
  )
  const [value, setValue] = useState<string>('')

  const onDebounce = useCallback(
    async (val: string) => {
      if (!val) return
      console.log(val)
      await refetch({ queryText: val })
      setLoadingText(false)
    },
    [refetch],
  )

  return {
    teammates,
    loading,
    value,
    setValue,
    onDebounce,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Menus/ProjectTeammateMenu/Provider.tsx'
export const { Provider, useContext: useProjectTeammateMenuContext } =
  createProvider(useValue)
