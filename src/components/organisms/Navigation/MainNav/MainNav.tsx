import React from 'react'
import { List } from 'src/components/atoms'
import { MAX_WIDTH } from '../Navigation'
import { NavListItem as TNavListItem } from '../type'
import { NavListItem } from '../NavListItem'

const items: TNavListItem[] = [
  {
    name: 'Home',
    href: 'home',
    icon: 'home',
    pathname: '/',
  },
  {
    name: 'My Tasks',
    href: 'tasks',
    icon: 'checkCircle',
    pathname: '/tasks',
  },
  {
    name: 'Inbox',
    href: 'inbox',
    icon: 'bell',
    pathname: '/inbox',
  },
  {
    name: 'Portfolios',
    href: 'portfolios',
    icon: 'barChart',
    pathname: '/portfolios',
  },
  {
    name: 'Goals',
    href: 'goals',
    icon: 'rocket',
    pathname: '/goals',
  },
]

export const MainNav: React.VFC = () => {
  return (
    <List w={MAX_WIDTH} mb={2}>
      {items.map((n, i) => (
        <NavListItem key={i} item={n} selectedStyle />
      ))}
    </List>
  )
}
