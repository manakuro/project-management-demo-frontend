import type { NextRouter } from 'next/router'
import {
  ROUTE_WORKSPACES,
  ROUTE_WORKSPACES_CALENDAR,
  ROUTE_WORKSPACES_MESSAGES,
  ROUTE_WORKSPACES_OVERVIEW,
} from './routes'

export const isWorkspacesURL = (router: NextRouter): boolean => {
  return ROUTE_WORKSPACES.regex.test(router.asPath)
}

export const isWorkspacesMessageURL = (router: NextRouter): boolean => {
  return ROUTE_WORKSPACES_MESSAGES.regex.test(router.asPath)
}

export const isWorkspacesCalendarURL = (router: NextRouter): boolean => {
  return ROUTE_WORKSPACES_CALENDAR.regex.test(router.asPath)
}

export const isWorkspacesOverviewURL = (router: NextRouter): boolean => {
  return ROUTE_WORKSPACES_OVERVIEW.regex.test(router.asPath)
}

export const getWorkspacesIdFromURL = (router: NextRouter): string =>
  (isWorkspacesURL(router) &&
    (router.query?.[ROUTE_WORKSPACES.query.workspaceId] as string)) ||
  ''
