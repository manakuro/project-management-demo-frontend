import React from 'react'
import {
  Flex,
  Text,
  List,
  ListItem,
  Logo,
  Link,
  NextLink,
  Icon,
} from 'src/components/UI/atoms'
import { useRouter } from 'next/router'

const navigations = [
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
] as const

export const Navigation: React.VFC = () => {
  const router = useRouter()
  return (
    <Flex
      as="nav"
      w="240px"
      backgroundColor="gray.800"
      flexDirection="column"
      color="white"
    >
      <Flex w="full" h="72px" alignItems="center" px="6">
        <NextLink href="home" passHref>
          <Link>
            <Logo />
          </Link>
        </NextLink>
        <Icon icon="menu" color="white" ml="auto" cursor="pointer" mb="-2px" />
      </Flex>
      <List>
        {navigations.map((n, i) => (
          <ListItem key={i}>
            <NextLink href={n.href} passHref>
              <Link
                display="flex"
                alignItems="center"
                px={6}
                py={2}
                _hover={{
                  bg: 'rgba(255,255,255,.08)',
                }}
                {...(n.pathname === router.pathname
                  ? { bg: 'rgba(255,255,255,.16)' }
                  : {})}
              >
                <Icon icon={n.icon} mr={2} mt="-2px" />
                <Text fontSize="sm">{n.name}</Text>
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
