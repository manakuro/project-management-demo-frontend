import { ROUTE_HOME } from './home'
import { ROUTE_INBOX } from './inbox'
import {
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_LIST,
} from './myTasks'

export { ROUTE_HOME } from './home'
export { ROUTE_INBOX } from './inbox'
export {
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_LIST,
} from './myTasks'
export {
  ROUTE_PROJECTS_LIST,
  ROUTE_PROJECTS_BOARD,
  ROUTE_PROJECTS_CALENDAR,
  ROUTE_PROJECTS_FILES,
} from './projects'

export const ROUTE_PORTFOLIOS = {
  name: 'portfolios',
  href: {
    pathname: '/portfolios',
  },
} as const
export const ROUTE_GOALS = {
  name: 'goals',
  href: {
    pathname: '/goals',
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
] as const

export type Routes = typeof routes[number]['name']
export type Pathname = typeof routes[number]['href']['pathname']
