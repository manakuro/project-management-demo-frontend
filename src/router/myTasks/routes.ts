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
