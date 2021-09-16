export const ROUTE_HOME = {
  name: 'home',
  href: {
    pathname: '/',
  },
  queryName: 'index',
} as const
export const ROUTE_MY_TASKS = {
  name: 'my_tasks',
  href: {
    pathname: '/my_tasks',
  },
} as const
export const ROUTE_MY_TASKS_LIST = {
  name: 'my_tasks/list',
  href: {
    pathname: '/my_tasks/list',
  },
} as const
export const ROUTE_MY_TASKS_BOARD = {
  name: 'my_tasks/board',
  href: {
    pathname: '/my_tasks/board',
  },
  query: 'board',
} as const
export const ROUTE_MY_TASKS_CALENDAR = {
  name: 'my_tasks/calendar',
  href: {
    pathname: '/my_tasks/calendar',
  },
  query: 'calendar',
} as const
export const ROUTE_MY_TASKS_FILES = {
  name: 'my_tasks/files',
  href: {
    pathname: '/my_tasks/files',
  },
  query: 'files',
} as const
export const ROUTE_PROJECTS_LIST = {
  name: (id: string) => `projects/${id}/list`,
  href: {
    pathname: (id: string) => `projects/${id}/list`,
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_BOARD = {
  name: (id: string) => `projects/${id}/board`,
  href: {
    pathname: (id: string) => `projects/${id}/board`,
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_CALENDAR = {
  name: (id: string) => `projects/${id}/calendar`,
  href: {
    pathname: (id: string) => `projects/${id}/calendar`,
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_FILES = {
  name: (id: string) => `projects/${id}/files`,
  href: {
    pathname: (id: string) => `projects/${id}/files`,
  },
  query: 'projects',
} as const
export const ROUTE_PORTFOLIOS = {
  name: 'portfolios',
  href: {
    pathname: '/portfolios',
  },
} as const
export const ROUTE_INBOX = {
  name: 'inbox',
  href: {
    pathname: '/inbox',
  },
} as const
export const ROUTE_GOALS = {
  name: 'goals',
  href: {
    pathname: '/goals',
  },
} as const
export const ROUTE_FAVORITES_ALL_ITEMS = {
  name: 'favorites/all-items',
  href: {
    pathname: '/favorites/all-items',
  },
} as const
export const ROUTE_FAVORITES_DELETED_ITEMS = {
  name: 'favorites/deleted-items',
  href: {
    pathname: '/favorites/deleted-items',
  },
} as const
export const ROUTE_TASKS_IVE_CHANGED = {
  name: 'reports/tasks-ive-changed',
  href: {
    pathname: '/reports/tasks-ive-changed',
  },
} as const

export const routes = [
  ROUTE_HOME,
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_PORTFOLIOS,
  ROUTE_INBOX,
  ROUTE_GOALS,
  ROUTE_FAVORITES_ALL_ITEMS,
  ROUTE_FAVORITES_DELETED_ITEMS,
  ROUTE_TASKS_IVE_CHANGED,
] as const

export type Routes = typeof routes[number]['name']
export type Pathname = typeof routes[number]['href']['pathname']
