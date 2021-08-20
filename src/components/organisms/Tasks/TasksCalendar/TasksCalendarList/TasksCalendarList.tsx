import React, { memo, useEffect, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { getCalendarMatrix } from 'src/shared/date'
import { dateFns } from 'src/shared/dateFns'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { TasksCalendarListItem } from '../TasksCalendarListItem'
import { useTasksCalendarId } from '../useTasksCalendarId'

type Props = FlexProps

export const TasksCalendarList: React.FC<Props> = memo<Props>(() => {
  const { getCalendarListId, getCalendarListItemId } = useTasksCalendarId()
  const rows = useMemo(
    () =>
      getCalendarMatrix(
        dateFns.subMonths(new Date(), 6),
        dateFns.addMonths(new Date(), 6),
      ),
    [],
  )

  useEffect(() => {
    const element = document.getElementById(
      getCalendarListItemId(dateFns.subDays(new Date(), 7)),
    )
    if (!isHTMLElement(element)) return

    element.scrollIntoView()
  }, [getCalendarListItemId])

  return (
    <Flex flex={1} flexDirection="column">
      {rows.map((r) => (
        <Flex
          marginBottom="3px"
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
        </Flex>
      ))}
    </Flex>
  )
})
TasksCalendarList.displayName = 'TasksCalendarList'
