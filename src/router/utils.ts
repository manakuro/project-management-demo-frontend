import { NextRouter } from 'next/router'
import { isNumeric } from 'src/shared/utils/isNumeric'

// TODO: Should be verified
export const isTaskDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query.tasks?.length &&
    isNumeric(router.query.tasks[0] as any)
  )
}
export const getTaskDetailId = (router: NextRouter): string =>
  (isTaskDetailURL(router) && (router.query?.tasks?.[0] as string)) || ''

export const getTaskDetailFeedId = (router: NextRouter): string =>
  (isTaskDetailURL(router) && (router.query?.tasks?.[1] as string)) || ''
