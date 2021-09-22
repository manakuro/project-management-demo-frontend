export const ROUTE_PROJECTS = {
  regex: /^\/projects\/\d*\/?/iu,
  href: {
    pathname: (id: string) => `/projects/${id}`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]',
        query: { projectId: id },
      } as const),
  },
  query: {
    projectId: 'projectId',
    projects: 'projects',
  },
} as const

export const ROUTE_PROJECTS_LIST = {
  regex: /^\/projects\/\d*\/list\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/list`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/list',
        query: { projectId: id },
      } as const),
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_BOARD = {
  regex: /^\/projects\/\d*\/board\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/board`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/board',
        query: { projectId: id },
      } as const),
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_CALENDAR = {
  regex: /^\/projects\/\d*\/calendar\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/calendar`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/calendar',
        query: { projectId: id },
      } as const),
  },
  query: 'projects',
} as const
export const ROUTE_PROJECTS_FILES = {
  regex: /^\/projects\/\d*\/files\/?$/iu,
  href: {
    pathname: (id: string) => `/projects/${id}/files`,
    pathnameObj: (id: string) =>
      ({
        pathname: '/projects/[projectId]/files',
        query: { projectId: id },
      } as const),
  },
  query: 'projects',
} as const
