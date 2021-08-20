import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { getCalendarMatrix } from 'src/shared/date'
import { dateFns } from 'src/shared/dateFns'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { TasksCalendarListItem } from '../TasksCalendarListItem'
import { TasksCalendarListRow } from '../TasksCalendarListRow'
import { useTasksCalendarId } from '../useTasksCalendarId'

type Props = FlexProps

export const TasksCalendarList: React.FC<Props> = memo<Props>(() => {
  const { getCalendarListId, getCalendarListItemId } = useTasksCalendarId()
  const [startIndex, setStartIndex] = useState(6)
  const [endIndex, setEndIndex] = useState(6)
  const rows = useMemo<Date[][]>(
    () =>
      getCalendarMatrix(
        dateFns.subMonths(new Date(), startIndex),
        dateFns.addMonths(new Date(), endIndex),
      ),
    [endIndex, startIndex],
  )
  console.log('rows: ', rows)

  const handleVisibleWhenScrollUp = useCallback(() => {
    setStartIndex((s) => s + 3)
    console.log('handleVisibleWhenScrollUp')
  }, [])

  const handleVisibleWhenScrollDown = useCallback(() => {
    setEndIndex((s) => s + 3)
    console.log('handleVisibleWhenScrollDown')
  }, [])

  useEffect(() => {
    const element = document.getElementById(
      getCalendarListItemId(dateFns.subDays(new Date(), 7)),
    )
    if (!isHTMLElement(element)) return

    element.scrollIntoView()
  }, [getCalendarListItemId])

  return (
    <Flex flex={1} flexDirection="column">
      {rows.map((r, i) => (
        <TasksCalendarListRow
          observeScrollUp={i === 10}
          observeScrollDown={i === rows.length - 10}
          onVisibleWhenScrollUp={handleVisibleWhenScrollUp}
          onVisibleWhenScrollDown={handleVisibleWhenScrollDown}
          key={getCalendarListId(r[0])}
          id={getCalendarListId(r[0])}
        >
          {r.map((date) => (
            <TasksCalendarListItem
              key={getCalendarListItemId(date)}
              id={getCalendarListItemId(date)}
              date={date}
            />
          ))}
        </TasksCalendarListRow>
      ))}
    </Flex>
  )
})
TasksCalendarList.displayName = 'TasksCalendarList'
