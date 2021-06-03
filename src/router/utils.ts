import { NextRouter } from 'next/router'

// TODO: Should be verified
export const isTaskDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query && !!router.query.tasks?.length && !!router.query.tasks[0]
  )
}

export const isTasksURL = (router: NextRouter): boolean => {
  return !!router.query && !!router.query.tasks
}
export const getTaskDetailId = (router: NextRouter): string =>
  (isTaskDetailURL(router) && (router.query?.tasks?.[0] as string)) || ''

export const getTaskDetailFeedId = (router: NextRouter): string =>
  (isTaskDetailURL(router) && (router.query?.tasks?.[1] as string)) || ''
