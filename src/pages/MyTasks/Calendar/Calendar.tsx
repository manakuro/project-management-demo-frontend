import React, { memo, useCallback, useState } from 'react'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import {
  TasksProvider,
  TasksCalendarContent,
  TasksCalendarList,
  TasksCalendarListHeader,
  useTasksCalendarDetail,
  TasksCalendar,
} from 'src/components/organisms/Tasks'
import {
  CalendarMonthPicker,
  WeekendsButton,
  TasksHeader,
  TasksHeaderRight,
  TasksHeaderLeft,
  TodayButton,
} from 'src/components/organisms/Tasks/TasksHeader'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { getTaskDetailId, isTaskDetailURL, useRouter } from 'src/router'
import { SkeletonCalendar } from './SkeletonCalendar'

export const Calendar: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useMyTasksContext()
  const { navigateToMyTasksCalendar } = useRouter()
  const [loading, setLoading] = useState(true)

  const endLoading = useCallback(() => {
    setLoading(false)
  }, [])

  useTasksCalendarDetail({
    isTaskDetailURL,
    getTaskDetailId,
  })

  if (loadingTabContent) return <SkeletonCalendar />

  return (
    <>
      <TasksCalendar>
        <TasksHeader
          h="40px"
          borderBottom={1}
          borderStyle="solid"
          borderColor="gray.200"
          alignItems="center"
        >
          <TasksHeaderLeft>
            <CalendarMonthPicker />
          </TasksHeaderLeft>
          <TasksHeaderRight ml="auto">
            <TodayButton />
            <WeekendsButton />
          </TasksHeaderRight>
        </TasksHeader>
        <TasksCalendarListHeader />
        <TasksCalendarContent visibility={loading ? 'hidden' : 'visible'}>
          <TasksCalendarList onScrolled={endLoading} />
        </TasksCalendarContent>
      </TasksCalendar>
      <TaskDetailModal backToPage={navigateToMyTasksCalendar} />
    </>
  )
})
Calendar.displayName = 'Calendar'
