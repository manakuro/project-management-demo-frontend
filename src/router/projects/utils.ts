import { NextRouter } from 'next/router'
import {
  ROUTE_PROJECTS,
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
} from './routes'

export const isProjectsURL = (router: NextRouter): boolean => {
  return ROUTE_PROJECTS.regex.test(router.asPath)
}

export const isProjectsListURL = (router: NextRouter): boolean => {
  return ROUTE_PROJECTS_LIST.regex.test(router.asPath)
}

export const isProjectsBoardURL = (router: NextRouter): boolean => {
  return ROUTE_PROJECTS_BOARD.regex.test(router.asPath)
}

export const isProjectsCalendarURL = (router: NextRouter): boolean => {
  return ROUTE_PROJECTS_CALENDAR.regex.test(router.asPath)
}

export const isProjectsFilesURL = (router: NextRouter): boolean => {
  return ROUTE_PROJECTS_FILES.regex.test(router.asPath)
}

// TODO: Should be verified
export const isProjectsDetailURL = (router: NextRouter): boolean => {
  console.log(router)
  return (
    !!router.query &&
    !!router.query[ROUTE_PROJECTS.query.projects]?.length &&
    !!router.query[ROUTE_PROJECTS.query.projects]?.[0] &&
    !isProjectsListURL(router) &&
    !isProjectsBoardURL(router) &&
    !isProjectsCalendarURL(router) &&
    !isProjectsFilesURL(router)
  )
}
export const isProjectsDetailURLById = (
  router: NextRouter,
  taskId: string,
): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_PROJECTS.query.projects]?.length &&
    !!router.query[ROUTE_PROJECTS.query.projects]?.[0] &&
    router.query[ROUTE_PROJECTS.query.projects]?.[0] === taskId &&
    !isProjectsBoardURL(router) &&
    !isProjectsCalendarURL(router) &&
    !isProjectsFilesURL(router)
  )
}

export const getProjectsIdFromURL = (router: NextRouter): string =>
  (isProjectsURL(router) &&
    (router.query?.[ROUTE_PROJECTS.query.projectId] as string)) ||
  ''

export const getProjectsDetailId = (router: NextRouter): string =>
  (isProjectsDetailURL(router) &&
    (router.query?.[ROUTE_PROJECTS.query.projects]?.[0] as string)) ||
  ''

export const getProjectsDetailFeedId = (router: NextRouter): string =>
  (isProjectsDetailURL(router) &&
    (router.query?.[ROUTE_PROJECTS.query.projects]?.[1] as string)) ||
  ''

export const getProjectsDetailFeedURL = (
  id: string,
  taskId: string,
  feedId: string,
): string => {
  return `${window.location.origin}/${ROUTE_PROJECTS.href.pathname(
    id,
  )}/${taskId}/${feedId}`
}
