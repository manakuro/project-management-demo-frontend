export const ROUTE_HOME = {
  regex: /^\/$/iu,
  href: {
    pathname: () => '/' as const,
  },
  query: 'index',
} as const;
