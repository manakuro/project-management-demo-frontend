import {
  getMyTasksDetailFeedId,
  getMyTasksDetailFeedURL,
  getProjectsDetailFeedId,
  getProjectsDetailFeedURL,
  isMyTasksDetailURLById,
  isProjectsDetailURLById,
  useRouter,
} from '@/router';
import type { Options } from '@/router/types';
import { useProjectsProjectId } from '@/store/app/projects/project';
import { useCallback } from 'react';
import { useTasksContext } from '../TasksProvider';

type Result = {
  navigateToTaskDetail: (taskId: string, options?: Options) => Promise<void>;
  navigateToTaskBoard: (options?: Options) => Promise<void>;
  isTaskDetailURLById: (taskId: string) => boolean;
  getTasksDetailFeedURL: (props: {
    taskId: string;
    taskFeedId: string;
  }) => string;
  getTasksDetailFeedId: () => string;
};

export const useTasksRouter = (): Result => {
  const { isMyTasksPage, isHomePage, isInboxPage } = useTasksContext();
  const { projectId } = useProjectsProjectId();
  const {
    router,
    navigateToHomeDetail,
    navigateToMyTasksTaskDetail,
    navigateToProjectsTaskDetail,
    navigateToProjectsBoard,
    navigateToMyTasksBoard,
    navigateToInboxDetail,
  } = useRouter();

  const navigateToTaskDetail = useCallback(
    async (taskId: string, options?: Options) => {
      if (isHomePage) {
        await navigateToHomeDetail(taskId);
        return;
      }
      if (isInboxPage) {
        await navigateToInboxDetail(taskId);
        return;
      }

      if (isMyTasksPage) {
        await navigateToMyTasksTaskDetail(taskId, options);
        return;
      }

      await navigateToProjectsTaskDetail(projectId, taskId, options);
    },
    [
      isHomePage,
      isInboxPage,
      isMyTasksPage,
      navigateToHomeDetail,
      navigateToInboxDetail,
      navigateToMyTasksTaskDetail,
      navigateToProjectsTaskDetail,
      projectId,
    ],
  );

  const navigateToTaskBoard = useCallback(
    async (options?: Options) => {
      if (isMyTasksPage) {
        await navigateToMyTasksBoard(options);
        return;
      }

      await navigateToProjectsBoard(projectId, options);
    },
    [isMyTasksPage, navigateToMyTasksBoard, navigateToProjectsBoard, projectId],
  );

  const isTaskDetailURLById = useCallback(
    (taskId: string) => {
      if (isMyTasksPage) return isMyTasksDetailURLById(router, taskId);

      return isProjectsDetailURLById(router, taskId);
    },
    [isMyTasksPage, router],
  );

  const getTasksDetailFeedURL = useCallback(
    ({ taskId, taskFeedId }: { taskId: string; taskFeedId: string }) => {
      if (isMyTasksPage) return getMyTasksDetailFeedURL(taskId, taskFeedId);

      return getProjectsDetailFeedURL(projectId, taskId, taskFeedId);
    },
    [isMyTasksPage, projectId],
  );

  const getTasksDetailFeedId = useCallback(() => {
    if (isMyTasksPage) return getMyTasksDetailFeedId(router);

    return getProjectsDetailFeedId(router);
  }, [isMyTasksPage, router]);

  return {
    navigateToTaskDetail,
    navigateToTaskBoard,
    isTaskDetailURLById,
    getTasksDetailFeedURL,
    getTasksDetailFeedId,
  };
};
