import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchMenuOnKeyBindings } from 'src/components/organisms/Menus/SearchMenu'
import { useDebounce } from 'src/hooks'
import { Teammate } from 'src/store/entities/teammates'
import { useSearchProjectTeammatesQuery } from './useSearchProjectTeammatesQuery'

type Props = {
  onSelect: (val: Teammate) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
}

export const useProjectTeammateMenu = (props: Props) => {
  const { queryText, onClose, onClosed, onSelect } = props
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

  const onSelectTeammate = useCallback(
    (val: Teammate) => {
      onSelect(val)
      onClose()
      onClosed?.()
      setLoadingText(false)
    },
    [onClose, onClosed, onSelect],
  )

  useSearchMenuOnKeyBindings({
    items: teammates,
    onSetValue: onSelectTeammate,
  })

  useEffect(() => {
    setLoadingText(true)
    setValue(queryText)
  }, [queryText])

  useDebounce(value, handleDebounce, 500)

  return {
    teammates,
    loading,
    fetchTeammates,
    onSelectTeammate,
  }
}
