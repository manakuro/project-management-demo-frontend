import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { useTaskDetailModal } from '@/components/features/organisms/TaskDetails';
import { useRouter } from '@/router';
import type { NextRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean;
  getTaskDetailId: (router: NextRouter) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useHomeTaskDetail = (props: Props) => {
  const { router } = useRouter();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    if (!isTaskDetailURL(router)) return;
    const newId = getTaskDetailId(router);
    console.log('useHomeDetail!: ', newId);

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
    fetchQuery,
  ]);
};
