import { NextRouter } from 'next/router'
import { ROUTE_MY_TASKS } from 'src/router/routes'

// TODO: Should be verified
export const isTaskDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_MY_TASKS['name']]?.length &&
    !!router.query[ROUTE_MY_TASKS['name']]?.[0]
  )
}

export const isTasksURL = (router: NextRouter): boolean => {
  return !!router.query && !!router.query[ROUTE_MY_TASKS['name']]
}
export const getTaskDetailId = (router: NextRouter): string =>
  (isTaskDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS['name']]?.[0] as string)) ||
  ''

export const getTaskDetailFeedId = (router: NextRouter): string =>
  (isTaskDetailURL(router) &&
    (router.query?.[ROUTE_MY_TASKS['name']]?.[1] as string)) ||
  ''
