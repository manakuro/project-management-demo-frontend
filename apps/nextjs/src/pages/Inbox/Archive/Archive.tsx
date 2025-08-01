import {
  Inbox,
  InboxHeader,
  InboxLeft,
  InboxList,
  InboxListContent,
  InboxRight,
  InboxSkeleton,
} from '@/components/features/organisms/Inbox';
import { useInboxTaskDetail } from '@/components/features/organisms/Inbox';
import { TaskDetailSide } from '@/components/features/organisms/TaskDetails';
import { TasksProvider } from '@/components/features/organisms/Tasks';
import { Flex } from '@/components/ui/atoms';
import { useInboxArchivePageQuery } from '@/hooks/queries/app';
import { getInboxDetailId, isInboxDetailURL } from '@/router';
import type React from 'react';
import { memo, useMemo } from 'react';
import { useInboxPageContext } from '../Provider';

export const Archive: React.FC = memo(() => {
  return <Component />;
});

const Component: React.FC = memo(() => {
  const { loadingTabContent } = useInboxPageContext();
  const { loading: loadingQuery } = useInboxArchivePageQuery();
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  );

  useInboxTaskDetail({
    isTaskDetailURL: isInboxDetailURL,
    getTaskDetailId: getInboxDetailId,
    fetchQuery: async () => {},
  });

  if (loading) return <InboxSkeleton />;

  return (
    <TasksProvider isInboxPage>
      <Inbox isArchive>
        <InboxLeft>
          <InboxHeader />
          <InboxListContent>
            <Flex>
              <InboxList />
            </Flex>
          </InboxListContent>
        </InboxLeft>
        <InboxRight>
          <TaskDetailSide />
        </InboxRight>
      </Inbox>
    </TasksProvider>
  );
});
Component.displayName = 'Component';
Archive.displayName = 'Archive';
