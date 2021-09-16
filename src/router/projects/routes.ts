export const ROUTE_PROJECTS = {
  regex: /^\/projects\/\d*\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}`,
  },
  query: 'projects',
} as const

export const ROUTE_PROJECTS_LIST = {
  regex: /^\/projects\/\d*\/list\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/list`,
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_BOARD = {
  regex: /^\/projects\/\d*\/board\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/board`,
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_CALENDAR = {
  regex: /^\/projects\/\d*\/calendar\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/calendar`,
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_FILES = {
  regex: /^\/projects\/\d*\/files\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/files`,
  },
  query: 'projects',
} as const
