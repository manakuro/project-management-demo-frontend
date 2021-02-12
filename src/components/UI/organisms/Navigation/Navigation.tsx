import React, { useCallback, useState } from 'react'
import {
  Flex,
  Text,
  List,
  ListItem,
  Link,
  NextLink,
  Icon,
} from 'src/components/UI/atoms'
import { useRouter } from 'next/router'
import { Main } from './Main'
import { Footer } from './Footer'
import { Header } from './Header'

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

export const PADDING_X = 4
export const MAX_WIDTH = '240px'
export const MIN_WIDTH = '53px'
export const Navigation: React.VFC = () => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleMenu = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <Flex
      as="nav"
      w={isExpanded ? MAX_WIDTH : MIN_WIDTH}
      backgroundColor="gray.800"
      flexDirection="column"
      color="white"
      transition="width .25s cubic-bezier(0.820, 0.085, 0.395, 0.895)"
      overflowX="hidden"
      position="fixed"
      h="100vh"
    >
      <Header isExpanded={isExpanded} toggleMenu={toggleMenu} />
      <List w={MAX_WIDTH} mb={2}>
        {navigations.map((n, i) => (
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

      <Main isExpanded={isExpanded} />

      <Footer />
    </Flex>
  )
}
