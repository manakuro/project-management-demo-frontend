import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  TasksProvider,
  TasksCalendarContent,
  useTasksCalendarDetail,
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

  useTasksCalendarDetail({
    isTaskDetailURL,
    getTaskDetailId,
    backToPage: navigateToMyTasksCalendar,
  })

  if (loadingTabContent) return <SkeletonCalendar />

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksHeader
          h="40px"
          boxShadow="sm"
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
        <TasksCalendarContent>hey</TasksCalendarContent>
      </Flex>
    </>
  )
})
Calendar.displayName = 'Calendar'
