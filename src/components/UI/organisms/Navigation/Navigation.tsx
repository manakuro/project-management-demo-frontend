import React, { useCallback, useState } from 'react'
import {
  Flex,
  Text,
  List,
  ListItem,
  Logo,
  Link,
  NextLink,
  Icon,
  Box,
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

const PADDING_X = 4
const MAX_WIDTH = '240px'
const MIN_WIDTH = '53px'
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
    >
      <Flex w="full" h="72px" alignItems="center" px={PADDING_X}>
        {isExpanded && (
          <NextLink href="home" passHref>
            <Link>
              <Logo />
            </Link>
          </NextLink>
        )}
        <Box onClick={toggleMenu} ml={isExpanded ? 'auto' : 0}>
          <Icon icon="menu" color="white" cursor="pointer" mb="-2px" />
        </Box>
      </Flex>
      <List w={MAX_WIDTH}>
        {navigations.map((n, i) => (
          <ListItem key={i}>
            <NextLink href={n.href} passHref>
              <Link
                display="flex"
                alignItems="center"
                px={PADDING_X}
                py={2}
                _hover={{
                  bg: 'rgba(255,255,255,.08)',
                }}
                {...(n.pathname === router.pathname
                  ? { bg: 'rgba(255,255,255,.16)' }
                  : {})}
              >
                <Icon icon={n.icon} mr={PADDING_X} mt="-2px" />
                <Text fontSize="sm">{n.name}</Text>
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
