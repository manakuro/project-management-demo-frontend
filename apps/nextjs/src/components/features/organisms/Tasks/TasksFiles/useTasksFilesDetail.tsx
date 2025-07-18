import type { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail';
import { useTaskDetailModal } from 'src/components/features/organisms/TaskDetails';
import { useRouter } from 'src/router';

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean;
  getTaskDetailId: (router: NextRouter) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useTasksFilesDetail = (props: Props) => {
  const { router } = useRouter();
  const { setId, setLoading } = useTaskDetail();
  const { onOpen } = useTaskDetailModal();
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;

  useEffect(() => {
    if (!isTaskDetailURL(router)) return;
    const newId = getTaskDetailId(router);
    console.log('useTasksFilesDetail!: ', newId);

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
