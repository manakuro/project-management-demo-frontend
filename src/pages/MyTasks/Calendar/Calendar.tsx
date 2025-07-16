import type React from 'react';
import { memo } from 'react';
import { TaskDetailModal } from 'src/components/features/organisms/TaskDetails';
import {
  TasksCalendar,
  TasksCalendarContent,
  TasksCalendarList,
  TasksCalendarListHeader,
  TasksContainer,
  useTasksCalendarDetail,
} from 'src/components/features/organisms/Tasks';
import {
  CalendarMonthPicker,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TodayButton,
} from 'src/components/features/organisms/Tasks/TasksHeader';
import { useMyTasksContext } from 'src/pages/MyTasks/Provider';
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from 'src/router';
import { SkeletonCalendar } from './SkeletonCalendar';

export const Calendar: React.FC = memo(() => {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  );
});

const Component: React.FC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useMyTasksContext();
  const { navigateToMyTasksCalendar } = useRouter();

  useTasksCalendarDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  if (tabContentLoading) return <SkeletonCalendar />;

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
  );
});
Component.displayName = 'Component';
Calendar.displayName = 'Calendar';
