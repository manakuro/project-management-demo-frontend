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
] as const

export type Routes = typeof routes[number]['name']
