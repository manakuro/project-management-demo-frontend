import React, { memo, useCallback } from 'react'
import { Button } from 'src/components/atoms'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import {
  useTasksCalendarId,
  useTasksCalendarContext,
} from '../../TasksCalendar'

type Props = {}

export const TodayButton: React.VFC<Props> = memo<Props>(() => {
  const { getCalendarListItemId } = useTasksCalendarId()
  const { resetIndex, resetMonth, startResetting, endResetting } =
    useTasksCalendarContext()

  const handleClickToday = useCallback(() => {
    startResetting()
    resetIndex()
    resetMonth()
    setTimeout(() => {
      const element = document.getElementById(getCalendarListItemId(new Date()))
      if (!isHTMLElement(element)) return

      element.scrollIntoView()
      endResetting()
    })
  }, [
    endResetting,
    getCalendarListItemId,
    resetIndex,
    resetMonth,
    startResetting,
  ])

  return (
    <Button variant="ghost" size="xs" onClick={handleClickToday}>
      Today
    </Button>
  )
})
TodayButton.displayName = 'TodayButton'
