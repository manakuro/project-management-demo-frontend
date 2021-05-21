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
