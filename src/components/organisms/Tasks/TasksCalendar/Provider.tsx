import { useCallback, useMemo, useState } from 'react'
import { getCalendarMatrix } from 'src/shared/date'
import { dateFns } from 'src/shared/dateFns'
import { createProvider } from 'src/shared/react/createProvider'
import { useTasksCalendarId } from './useTasksCalendarId'

type ContextProps = {
  calendarRows: Date[][]
  resetIndex: () => void
  onVisibleWhenScrollUp: (id: string) => void
  onVisibleWhenScrollDown: (id: string) => void
  isSecondRowOfMonth: (row: Date[]) => boolean
  currentDate: Date
  onNextMonth: () => void
  onPrevMonth: () => void
  resetMonth: () => void
  resetCount: number
  incrementResetCount: () => void
  setMonth: (date: Date) => void
}

const useValue = (): ContextProps => {
  const [startIndex, setStartIndex] = useState(6)
  const [endIndex, setEndIndex] = useState(6)
  const [currentDate, setCurrentDate] = useState(new Date())
  const { getCalendarListId } = useTasksCalendarId()
  const [resetCount, setResetCount] = useState(0)

  const incrementResetCount = useCallback(() => {
    setResetCount((s) => s + 1)
  }, [])

  const onNextMonth = useCallback(() => {
    setCurrentDate((s) => dateFns.addMonths(s, 1))
  }, [])

  const onPrevMonth = useCallback(() => {
    setCurrentDate((s) => dateFns.subMonths(s, 1))
  }, [])

  const setMonth = useCallback((date: Date) => {
    setCurrentDate(date)
  }, [])

  const resetMonth = useCallback(() => {
    setMonth(new Date())
  }, [setMonth])

  const calendarRows = useMemo<Date[][]>(
    () =>
      getCalendarMatrix(
        dateFns.subMonths(new Date(), startIndex),
        dateFns.addMonths(new Date(), endIndex),
      ),
    [endIndex, startIndex],
  )

  const isSecondRowOfMonth = useCallback(
    (row: Date[]) => {
      return !!(
        calendarRows
          .filter((c) => c.some((date) => dateFns.isEndOfMonth(date)))
          .find((c) => getCalendarListId(c[0]) === getCalendarListId(row[0])) ??
        false
      )
    },
    [calendarRows, getCalendarListId],
  )

  const onVisibleWhenScrollUp = useCallback((id: string) => {
    setStartIndex((s) => s + 3)
    setEndIndex((s) => s - 3)
    console.log('handleVisibleWhenScrollUp: ', id)
  }, [])

  const onVisibleWhenScrollDown = useCallback((id: string) => {
    setStartIndex((s) => s - 3)
    setEndIndex((s) => s + 3)
    console.log('handleVisibleWhenScrollDown: ', id)
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
    isSecondRowOfMonth,
    currentDate,
    onNextMonth,
    onPrevMonth,
    resetMonth,
    resetCount,
    incrementResetCount,
    setMonth,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksCalendar/Provider.tsx'
export const { Provider, useContext: useTasksCalendarContext } =
  createProvider(useValue)
