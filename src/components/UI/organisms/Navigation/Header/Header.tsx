import React from 'react'
import {
  Logo,
  Link,
  NextLink,
  Icon,
  IconBg,
  Flex,
} from 'src/components/UI/atoms'
import { PADDING_X } from 'src/components/UI/organisms/Navigation'

type Props = {
  isExpanded: boolean
  toggleMenu: () => void
}

export const Header: React.VFC<Props> = ({ isExpanded, toggleMenu }) => {
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
