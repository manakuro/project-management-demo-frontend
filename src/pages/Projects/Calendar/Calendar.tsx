import React, { memo } from 'react'
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
  TasksHeader,
  TasksHeaderRight,
  TasksHeaderLeft,
  TodayButton,
} from 'src/components/organisms/Tasks/TasksHeader'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from 'src/router'
import { SkeletonCalendar } from './SkeletonCalendar'

export const Calendar: React.VFC = memo(() => {
  return (
    <TasksProvider isProjectsPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useMyTasksContext()
  const { navigateToMyTasksCalendar } = useRouter()

  useTasksCalendarDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
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
          </TasksHeaderRight>
        </TasksHeader>
        <TasksCalendarListHeader />
        <TasksCalendarContent>
          <TasksCalendarList />
        </TasksCalendarContent>
      </TasksCalendar>
      <TaskDetailModal backToPage={navigateToMyTasksCalendar} />
    </>
  )
})
Calendar.displayName = 'Calendar'