import { useRouter as useRouterNext } from 'next/router';
import { useCallback } from 'react';
import type { Options } from '../types';
import {
  ROUTE_PROJECTS,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_OVERVIEW,
} from './routes';

export const useRouterProjects = () => {
  const router = useRouterNext();
  const { push } = router;

  const navigateToProjectsList = useCallback(
    async (id: string, options?: Options) => {
      await push(ROUTE_PROJECTS_LIST.href.pathname(id), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );

  const navigateToProjectsTaskDetail = useCallback(
    async (id: string, taskId: string, options?: Options) => {
      await push(`${ROUTE_PROJECTS.href.pathname(id)}/${taskId}`, undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );

  const navigateToProjectsTaskDetailFeed = useCallback(
    async (
      id: string,
      taskId: string,
      taskFeedId: string,
      options?: Options,
    ) => {
      await push(
        `${ROUTE_PROJECTS.href.pathname(id)}/${taskId}/${taskFeedId}`,
        undefined,
        {
          shallow: true,
          ...options,
        },
      );
    },
    [push],
  );

  const navigateToProjectsBoard = useCallback(
    async (id: string, options?: Options) => {
      await push(ROUTE_PROJECTS_BOARD.href.pathname(id), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );
  const navigateToProjectsCalendar = useCallback(
    async (id: string, options?: Options) => {
      await push(ROUTE_PROJECTS_CALENDAR.href.pathname(id), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );
  const navigateToProjectsFiles = useCallback(
    async (id: string, options?: Options) => {
      await push(ROUTE_PROJECTS_FILES.href.pathname(id), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );

  const navigateToProjectsOverview = useCallback(
    async (id: string, options?: Options) => {
      await push(ROUTE_PROJECTS_OVERVIEW.href.pathname(id), undefined, {
        shallow: true,
        ...options,
      });
    },
    [push],
  );

  return {
    navigateToProjectsList,
    navigateToProjectsBoard,
    navigateToProjectsCalendar,
    navigateToProjectsFiles,
    navigateToProjectsTaskDetail,
    navigateToProjectsTaskDetailFeed,
    navigateToProjectsOverview,
  };
};
