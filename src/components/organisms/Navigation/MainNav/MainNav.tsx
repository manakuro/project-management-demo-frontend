import { useRouter } from 'next/router'
import React, { memo } from 'react'
import { List } from 'src/components/atoms'
import {
  ROUTE_HOME,
  ROUTE_MY_TASKS,
  ROUTE_INBOX,
  ROUTE_GOALS,
  ROUTE_PORTFOLIOS,
} from 'src/router'
import { NavListItem } from '../NavListItem'
import { MAX_WIDTH } from '../Navigation'
import { NavListItem as TNavListItem } from '../type'

const items: TNavListItem[] = [
  {
    name: 'Home',
    href: ROUTE_HOME.name,
    icon: 'home',
    pathname: ROUTE_HOME.href.pathname,
    isExternal: false,
    isCurrentRoute: (pathname) => pathname === ROUTE_HOME.href.pathname,
  },
  {
    name: 'My Tasks',
    href: ROUTE_MY_TASKS.name,
    icon: 'checkCircle',
    pathname: ROUTE_MY_TASKS.href.pathname,
    isExternal: false,
    isCurrentRoute: (pathname) => {
      return pathname.includes(ROUTE_MY_TASKS.href.pathname)
    },
  },
  {
    name: 'Inbox',
    href: ROUTE_INBOX.name,
    icon: 'bell',
    pathname: ROUTE_INBOX.href.pathname,
    isExternal: false,
    isCurrentRoute: (pathname) => pathname === ROUTE_INBOX.href.pathname,
  },
  {
    name: 'Portfolios',
    href: ROUTE_PORTFOLIOS.name,
    icon: 'barChart',
    pathname: ROUTE_PORTFOLIOS.href.pathname,
    isExternal: false,
    isCurrentRoute: (pathname) => pathname === ROUTE_PORTFOLIOS.href.pathname,
  },
  {
    name: 'Goals',
    href: ROUTE_GOALS.name,
    icon: 'rocket',
    pathname: ROUTE_GOALS.href.pathname,
    isExternal: false,
    isCurrentRoute: (pathname) => pathname === ROUTE_GOALS.href.pathname,
  },
]

export const MainNav: React.VFC = memo(() => {
  const router = useRouter()
  return (
    <List w={MAX_WIDTH} mb={2}>
      {items.map((n, i) => (
        <NavListItem
          key={i}
          item={n}
          pathname={router.pathname}
          selectedStyle
        />
      ))}
    </List>
  )
})
MainNav.displayName = 'MainNav'
