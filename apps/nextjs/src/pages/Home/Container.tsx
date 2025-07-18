import type React from 'react';
import { memo, useCallback } from 'react';
import { useHomePageQuery } from 'src/hooks/queries/app';
import { useHomeTaskDetailPageQuery } from 'src/hooks/queries/app';
import { useMe } from 'src/store/entities/me';
import { Component } from './Component';

export const Container: React.FC = memo(() => {
  const { loading } = useHomePageQuery();
  const { refetch } = useHomeTaskDetailPageQuery();
  const { me } = useMe();

  const fetchTaskDetailQuery = useCallback(
    async (variables: { taskId: string }) => {
      await refetch({ taskId: variables.taskId, teammateId: me.id });
    },
    [me.id, refetch],
  );

  return (
    <Component loading={loading} fetchTaskDetailQuery={fetchTaskDetailQuery} />
  );
});

Container.displayName = 'Container';
