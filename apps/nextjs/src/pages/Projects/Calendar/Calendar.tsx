import type React from 'react';
import { memo, useCallback } from 'react';
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
import { useProjectsPageContext } from 'src/pages/Projects/Provider';
import {
  getProjectsDetailId,
  isProjectsDetailURL,
  useRouter,
} from 'src/router';
import { useProjectsProjectId } from 'src/store/app/projects/project';
import { SkeletonCalendar } from './SkeletonCalendar';

export const Calendar: React.FC = memo(() => {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  );
});

const Component: React.FC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useProjectsPageContext();
  const { navigateToProjectsCalendar } = useRouter();
  const { projectId } = useProjectsProjectId();

  useTasksCalendarDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
  });

  const backToPage = useCallback(async () => {
    await navigateToProjectsCalendar(projectId);
  }, [navigateToProjectsCalendar, projectId]);

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
      <TaskDetailModal backToPage={backToPage} />
    </>
  );
});
Component.displayName = 'Component';
Calendar.displayName = 'Calendar';
