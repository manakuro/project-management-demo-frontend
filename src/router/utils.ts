import { NextRouter } from 'next/router'
import {
  ROUTE_HOME,
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS,
  ROUTE_INBOX,
} from 'src/router/routes'

export const isHomeDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_HOME.queryName]?.length &&
    !!router.query[ROUTE_HOME.queryName]?.[0]
  )
}
export const getHomeDetailId = (router: NextRouter): string =>
  (isHomeDetailURL(router) &&
    (router.query?.[ROUTE_HOME.queryName]?.[0] as string)) ||
  ''

// TODO: Should be verified
export const isMyTasksDetailURL = (router: NextRouter): boolean => {
  console.log(router)
  return (
    !!router.query &&
    !!router.query[ROUTE_MY_TASKS.name]?.length &&
    !!router.query[ROUTE_MY_TASKS.name]?.[0] &&
    !isMyTasksListURL(router) &&
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
    !!router.query[ROUTE_MY_TASKS.name]?.length &&
    !!router.query[ROUTE_MY_TASKS.name]?.[0] &&
    router.query[ROUTE_MY_TASKS.name]?.[0] === taskId &&
    !isMyTasksBoardURL(router) &&
    !isMyTasksCalendarURL(router) &&
    !isMyTasksFilesURL(router)
  )
}

export const isMyTasksListURL = (router: NextRouter): boolean => {
  return router.asPath === ROUTE_MY_TASKS_LIST.href.pathname
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

export const getMyTasksDetailId = (router: NextRouter): string =>
  (isMyTasksDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS.name]?.[0] as string)) ||
  ''

export const getMyTasksDetailFeedId = (router: NextRouter): string =>
  (isMyTasksDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS.name]?.[1] as string)) ||
  ''

export const getMyTasksDetailFeedURL = (
  taskId: string,
  feedId: string,
): string => {
  return `${window.location.origin}/${ROUTE_MY_TASKS.name}/${taskId}/${feedId}`
}

export const taskDetailURL = (taskId: string): string => {
  return `${window.location.origin}/${taskId}/f`
}

export const isInboxDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_INBOX.name]?.length &&
    !!router.query[ROUTE_INBOX.name]?.[0]
  )
}
export const getInboxDetailId = (router: NextRouter): string =>
  (isInboxDetailURL(router) &&
    (router.query?.[ROUTE_INBOX.name]?.[0] as string)) ||
  ''
