import { useCallback, useMemo, useState } from 'react'
import { getCalendarMatrix } from 'src/shared/date'
import { dateFns } from 'src/shared/dateFns'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  calendarRows: Date[][]
  resetIndex: () => void
  onVisibleWhenScrollUp: () => void
  onVisibleWhenScrollDown: () => void
}

const useValue = (): ContextProps => {
  const [startIndex, setStartIndex] = useState(6)
  const [endIndex, setEndIndex] = useState(6)

  const calendarRows = useMemo<Date[][]>(
    () =>
      getCalendarMatrix(
        dateFns.subMonths(new Date(), startIndex),
        dateFns.addMonths(new Date(), endIndex),
      ),
    [endIndex, startIndex],
  )

  const onVisibleWhenScrollUp = useCallback(() => {
    setStartIndex((s) => s + 3)
    setEndIndex((s) => s - 3)
    console.log('handleVisibleWhenScrollUp')
  }, [])

  const onVisibleWhenScrollDown = useCallback(() => {
    setStartIndex((s) => s - 3)
    setEndIndex((s) => s + 3)
    console.log('handleVisibleWhenScrollDown')
  }, [])

  const resetIndex = useCallback(() => {
    setStartIndex(6)
    setEndIndex(6)
  }, [])

  return {
    calendarRows,
    resetIndex,
    onVisibleWhenScrollUp,
    onVisibleWhenScrollDown,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksCalendar/Provider.tsx'
export const { Provider, useContext: useTasksCalendarContext } =
  createProvider(useValue)
