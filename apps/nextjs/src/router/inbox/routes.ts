export const ROUTE_INBOX = {
  regex: /^\/inbox\/?$/iu,
  href: {
    pathname: () => '/inbox' as const,
  },
  query: 'inbox',
} as const;
