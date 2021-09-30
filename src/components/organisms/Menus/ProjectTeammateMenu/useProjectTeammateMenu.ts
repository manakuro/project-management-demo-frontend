import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'src/hooks'
import { useSearchProjectTeammatesQuery } from './useSearchProjectTeammatesQuery'

type Props = {
  queryText: string
}

export const useProjectTeammateMenu = (props: Props) => {
  const { queryText } = props
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

  const fetchTeammates = useCallback(
    async (val: string) => {
      console.log(val)
      await refetch({ queryText: val })
      setLoadingText(false)
    },
    [refetch],
  )

  const handleDebounce = useCallback(
    async (val: string) => {
      if (!val) return
      await fetchTeammates(val)
    },
    [fetchTeammates],
  )

  useEffect(() => {
    setLoadingText(true)
    setValue(queryText)
  }, [queryText])

  useDebounce(value, handleDebounce, 500)

  return {
    teammates,
    loading,
    fetchTeammates,
  }
}
