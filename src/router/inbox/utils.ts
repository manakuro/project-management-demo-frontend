import type { NextRouter } from 'next/router';
import { ROUTE_INBOX } from './routes';

export const isInboxDetailURL = (router: NextRouter): boolean => {
  return (
    !!router.query &&
    !!router.query[ROUTE_INBOX.query]?.length &&
    !!router.query[ROUTE_INBOX.query]?.[0]
  );
};
export const getInboxDetailId = (router: NextRouter): string =>
  (isInboxDetailURL(router) &&
    (router.query?.[ROUTE_INBOX.query]?.[0] as string)) ||
  '';
