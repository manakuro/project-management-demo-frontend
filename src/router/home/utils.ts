import { NextRouter } from 'next/router'
import { ROUTE_HOME } from './routes'

export const isHomeDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_HOME.query]?.length &&
    !!router.query[ROUTE_HOME.query]?.[0]
  )
}
export const getHomeDetailId = (router: NextRouter): string =>
  (isHomeDetailURL(router) &&
    (router.query?.[ROUTE_HOME.query]?.[0] as string)) ||
  ''
