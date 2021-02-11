export const routes = [
  {
    name: 'home',
    href: {
      pathname: '/',
    },
  },
] as const

export type Routes = typeof routes[number]['name']
