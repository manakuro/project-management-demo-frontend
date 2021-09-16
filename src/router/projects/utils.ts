import { NextRouter } from 'next/router'
import {
  ROUTE_PROJECTS,
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
} from './routes'

export const isProjectsListURL = (id: string, router: NextRouter): boolean => {
  return router.asPath === ROUTE_PROJECTS_LIST.href.pathname(id)
}

export const isProjectsBoardURL = (id: string, router: NextRouter): boolean => {
  return router.asPath === ROUTE_PROJECTS_BOARD.href.pathname(id)
}

export const isProjectsCalendarURL = (
  id: string,
  router: NextRouter,
): boolean => {
  return router.asPath === ROUTE_PROJECTS_CALENDAR.href.pathname(id)
}

export const isProjectsFilesURL = (id: string, router: NextRouter): boolean => {
  return router.asPath === ROUTE_PROJECTS_FILES.href.pathname(id)
}

// TODO: Should be verified
export const isProjectsDetailURL = (
  id: string,
  router: NextRouter,
): boolean => {
  console.log(router)
  return (
    !!router.query &&
    !!router.query[ROUTE_PROJECTS.query]?.length &&
    !!router.query[ROUTE_PROJECTS.query]?.[0] &&
    !isProjectsListURL(id, router) &&
    !isProjectsBoardURL(id, router) &&
    !isProjectsCalendarURL(id, router) &&
    !isProjectsFilesURL(id, router)
  )
}
export const isProjectsDetailURLById = (
  id: string,
  router: NextRouter,
  taskId: string,
): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_PROJECTS.query]?.length &&
    !!router.query[ROUTE_PROJECTS.query]?.[0] &&
    router.query[ROUTE_PROJECTS.query]?.[0] === taskId &&
    !isProjectsBoardURL(id, router) &&
    !isProjectsCalendarURL(id, router) &&
    !isProjectsFilesURL(id, router)
  )
}

export const getProjectsDetailId = (id: string, router: NextRouter): string =>
  (isProjectsDetailURL(id, router) &&
    (router.query?.[ROUTE_PROJECTS.query]?.[0] as string)) ||
  ''

export const getProjectsDetailFeedId = (
  id: string,
  router: NextRouter,
): string =>
  (isProjectsDetailURL(id, router) &&
    (router.query?.[ROUTE_PROJECTS.query]?.[1] as string)) ||
  ''

export const getProjectsDetailFeedURL = (
  id: string,
  taskId: string,
  feedId: string,
): string => {
  return `${window.location.origin}/${ROUTE_PROJECTS.name(
    id,
  )}/${taskId}/${feedId}`
}
