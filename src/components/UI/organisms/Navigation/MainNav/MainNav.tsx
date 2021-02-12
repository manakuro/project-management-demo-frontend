import React from 'react'
import {
  Text,
  List,
  ListItem,
  Link,
  NextLink,
  Icon,
} from 'src/components/UI/atoms'
import { useRouter } from 'next/router'
import { MAX_WIDTH, PADDING_X } from 'src/components/UI/organisms/Navigation'
import { NavListItem } from 'src/components/UI/organisms/Navigation/type'

const items: NavListItem[] = [
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
  const router = useRouter()

  return (
    <List w={MAX_WIDTH} mb={2}>
      {items.map((n, i) => (
        <ListItem key={i}>
          <NextLink href={n.href} passHref>
            <Link
              display="flex"
              alignItems="center"
              px={PADDING_X}
              py={2}
              _hover={{
                bg: 'navigation.hover',
              }}
              {...(n.pathname === router.pathname
                ? { bg: 'navigation.selected' }
                : {})}
            >
              <Icon icon={n.icon} mr={PADDING_X} mt="-2px" />
              <Text fontSize="sm">{n.name}</Text>
            </Link>
          </NextLink>
        </ListItem>
      ))}
    </List>
  )
}
