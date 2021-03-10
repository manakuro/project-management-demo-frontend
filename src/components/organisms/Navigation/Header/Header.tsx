import React from 'react'
import { Logo, Link, NextLink, Icon, IconBg, Flex } from 'src/components/atoms'
import { PADDING_X, useNavigation } from 'src/components/organisms/Navigation'

type Props = {}

export const Header: React.VFC<Props> = () => {
  const { isExpanded, toggleMenu } = useNavigation()

  return (
    <Flex
      w="full"
      h="72px"
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
      <IconBg mr={-2} onClick={toggleMenu}>
        <Icon icon="menu" />
      </IconBg>
    </Flex>
  )
}
