import React, { memo, useCallback } from 'react'
import { Button } from 'src/components/ui/atoms'
import { useTasksCalendarContext } from '../../TasksCalendar'

type Props = {}

export const TodayButton: React.FC<Props> = memo<Props>(() => {
  const { resetMonth, scrollToDate } = useTasksCalendarContext()

  const handleClickToday = useCallback(() => {
    resetMonth()
    scrollToDate(new Date())
  }, [resetMonth, scrollToDate])

  return (
    <Button variant="ghost" size="xs" onClick={handleClickToday}>
      Today
    </Button>
  )
})
TodayButton.displayName = 'TodayButton'
