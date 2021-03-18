import React from 'react'
import {
  Logo,
  Link,
  NextLink,
  Icon,
  Flex,
  IconButton,
} from 'src/components/atoms'
import { PADDING_X, useNavigation } from 'src/components/organisms/Navigation'

type Props = {}

export const Header: React.VFC<Props> = () => {
  const { isExpanded, toggleMenu } = useNavigation()

  return (
    <Flex
      w="full"
      h="72px"
      minH="72px"
      alignItems="center"
      px={PADDING_X}
      justifyContent="flex-end"
    >
      {isExpanded && (
        <NextLink href="home" passHref>
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
}
