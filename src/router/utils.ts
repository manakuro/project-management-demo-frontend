import { NextRouter } from 'next/router'
import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
} from 'src/router/routes'

// TODO: Should be verified
export const isTaskDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_MY_TASKS['name']]?.length &&
    !!router.query[ROUTE_MY_TASKS['name']]?.[0] &&
    !isMyTasksBoardURL(router) &&
    !isMyTasksCalendarURL(router) &&
    !isMyTasksFilesURL(router)
  )
}
export const isTaskDetailURLById = (
  router: NextRouter,
  taskId: string,
): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_MY_TASKS['name']]?.length &&
    !!router.query[ROUTE_MY_TASKS['name']]?.[0] &&
    router.query[ROUTE_MY_TASKS['name']]?.[0] === taskId &&
    !isMyTasksBoardURL(router) &&
    !isMyTasksCalendarURL(router) &&
    !isMyTasksFilesURL(router)
  )
}

export const isMyTasksURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS.href.pathname
}

export const isMyTasksBoardURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_BOARD.href.pathname
}

export const isMyTasksCalendarURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_CALENDAR.href.pathname
}

export const isMyTasksFilesURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_FILES.href.pathname
}

export const getTaskDetailId = (router: NextRouter): string =>
  (isTaskDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS['name']]?.[0] as string)) ||
  ''

export const getTaskDetailFeedId = (router: NextRouter): string =>
  (isTaskDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS['name']]?.[1] as string)) ||
  ''
