export const routes = [
  {
    name: 'home',
    href: {
      pathname: '/',
    },
  },
  {
    name: 'tasks',
    href: {
      pathname: '/tasks',
    },
  },
  {
    name: 'portfolios',
    href: {
      pathname: '/portfolios',
    },
  },
  {
    name: 'inbox',
    href: {
      pathname: '/inbox',
    },
  },
  {
    name: 'goals',
    href: {
      pathname: '/goals',
    },
  },
  {
    name: 'favorites/all-items',
    href: {
      pathname: '/favorites/all-items',
    },
  },
  {
    name: 'favorites/deleted-items',
    href: {
      pathname: '/favorites/deleted-items',
    },
  },
  {
    name: 'reports/tasks-ive-changed',
    href: {
      pathname: '/reports/tasks-ive-changed',
    },
  },
] as const

export type Routes = typeof routes[number]['name']
export type Pathname = typeof routes[number]['href']['pathname']
