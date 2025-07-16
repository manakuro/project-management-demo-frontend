import type { NextRouter } from 'next/router'
import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_LIST,
} from './routes'

export const isMyTasksListURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_LIST.href.pathname()
}

export const isMyTasksBoardURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_BOARD.href.pathname()
}

export const isMyTasksCalendarURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_CALENDAR.href.pathname()
}

export const isMyTasksFilesURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_FILES.href.pathname()
}

// TODO: Should be verified
export const isMyTasksDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_MY_TASKS.query]?.length &&
    !!router.query[ROUTE_MY_TASKS.query]?.[0] &&
    !isMyTasksListURL(router) &&
    !isMyTasksBoardURL(router) &&
    !isMyTasksCalendarURL(router) &&
    !isMyTasksFilesURL(router)
  )
}
export const isMyTasksDetailURLById = (
  router: NextRouter,
  taskId: string,
): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_MY_TASKS.query]?.length &&
    !!router.query[ROUTE_MY_TASKS.query]?.[0] &&
    router.query[ROUTE_MY_TASKS.query]?.[0] === taskId &&
    !isMyTasksBoardURL(router) &&
    !isMyTasksCalendarURL(router) &&
    !isMyTasksFilesURL(router)
  )
}

export const getMyTasksDetailId = (router: NextRouter): string =>
  (isMyTasksDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS.query]?.[0] as string)) ||
  ''

export const getMyTasksDetailFeedId = (router: NextRouter): string =>
  (isMyTasksDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS.query]?.[1] as string)) ||
  ''

export const getMyTasksDetailFeedURL = (
  taskId: string,
  taskFeedId: string,
): string => {
  return `${
    window.location.origin
  }${ROUTE_MY_TASKS.href.pathname()}/${taskId}/${taskFeedId}`
}
