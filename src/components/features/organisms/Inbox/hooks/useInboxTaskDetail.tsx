import type { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail';
import { useTaskDetailSide } from 'src/components/features/organisms/TaskDetails';
import { useRouter } from 'src/router';

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean;
  getTaskDetailId: (router: NextRouter) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useInboxTaskDetail = (props: Props) => {
  const { router } = useRouter();
  const { setId, setLoading, taskId, resetId } = useTaskDetail();
  const { onOpen } = useTaskDetailSide();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    return () => {
      resetId();
    };
  }, [resetId]);

  useEffect(() => {
    if (!isTaskDetailURL(router)) return;
    const newId = getTaskDetailId(router);
    if (taskId === newId) return;
    console.log('useInboxTaskDetail!: ', newId);

    setLoading(true);
    setId(newId);
    onOpen(() => {
      setTimeout(async () => {
        await fetchQuery({ taskId: newId });
        setLoading(false);
      }, 200);
    });
  }, [
    router,
    onOpen,
    setLoading,
    setId,
    isTaskDetailURL,
    getTaskDetailId,
    taskId,
    fetchQuery,
  ]);
};
