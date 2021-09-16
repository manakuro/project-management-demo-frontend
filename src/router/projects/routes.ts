export const ROUTE_PROJECTS = {
  name: (id: string) => `projects/${id}`,
  href: {
    pathname: (id: string) => `projects/${id}`,
  },
  query: 'projects',
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
