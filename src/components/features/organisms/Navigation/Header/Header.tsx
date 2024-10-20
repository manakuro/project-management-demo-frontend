import React, { memo } from 'react'
import {
  PADDING_X,
  useNavigation,
} from 'src/components/features/organisms/Navigation'
import {
  Logo,
  Link,
  NextLink,
  Icon,
  Flex,
  IconButton,
} from 'src/components/ui/atoms'
import { ROUTE_HOME } from 'src/router'

type Props = {}

export const Header: React.FC<Props> = memo<Props>(() => {
  const { isExpanded, toggleMenu } = useNavigation()

  return (
    <Flex
      w="full"
      h="72px"
      minH="72px"
      alignItems="center"
      px={PADDING_X}
      justifyContent="flex-end"
      ml={isExpanded ? 0 : '-3px'}
    >
      {isExpanded && (
        <NextLink href={ROUTE_HOME.href.pathname()} passHref legacyBehavior>
          <Link mr="auto">
            <Logo />
          </Link>
        </NextLink>
      )}
      <IconButton
        mr={-2}
        onClick={toggleMenu}
        aria-label="expand button"
        icon={<Icon icon="menu" />}
        variant="ghost"
        light
      />
    </Flex>
  )
})
Header.displayName = 'Header'
