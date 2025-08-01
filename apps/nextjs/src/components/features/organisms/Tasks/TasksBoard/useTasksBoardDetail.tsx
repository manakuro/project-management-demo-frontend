import { useTaskDetail } from '@/components/features/organisms/TaskDetail';
import { useTaskDetailDrawer } from '@/components/features/organisms/TaskDetails';
import { useTasksBoardListItemElement } from '@/components/features/organisms/Tasks/TasksBoard/TasksBoardListItem';
import type { UseClickOutsideOptionsHasClickedOutside } from '@/hooks';
import { useRouter } from '@/router';
import { isHTMLElement } from '@/shared/isHTMLElement';
import type { NextRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

type Props = {
  isTaskDetailURL: (router: NextRouter) => boolean;
  getTaskDetailId: (router: NextRouter) => string;
  fetchQuery: (variables: { taskId: string }) => Promise<void>;
};

export const useTasksBoardDetail = (props: Props) => {
  const { isTaskDetailURL, getTaskDetailId, fetchQuery } = props;
  const { router } = useRouter();
  const { taskId, setId, setLoading } = useTaskDetail();
  const { className } = useTasksBoardListItemElement();
  const hasClickedOutside =
    useCallback<UseClickOutsideOptionsHasClickedOutside>(
      (e, helpers) => {
        if (helpers.isContainInModalContent(e)) return false;
        if (helpers.isContainInMenuList(e)) return false;
        if (helpers.isContainInToastContent(e)) return false;
        if (helpers.isContainInPopoverContent(e)) return false;
        if (!isHTMLElement(e.target)) return false;
        if (e.target.closest(`.${className}`)) return false;

        return true;
      },
      [className],
    );
  const { onOpen } = useTaskDetailDrawer();

  useEffect(() => {
    if (!isTaskDetailURL(router)) return;

    const newId = getTaskDetailId(router);
    if (taskId === newId) return;
    console.log('render!');

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
    setId,
    taskId,
    setLoading,
    isTaskDetailURL,
    getTaskDetailId,
    fetchQuery,
  ]);

  return {
    hasClickedOutside,
  };
};
