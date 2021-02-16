import React from 'react'
import {
  Text,
  ListItem,
  Link,
  NextLink,
  Icon,
  ListItemProps,
} from 'src/components/atoms'
import { useRouter } from 'next/router'
import { PADDING_X } from './Navigation'
import { NavListItem as TNavListItem } from './type'

type Props = {
  item: TNavListItem
} & ListItemProps

export const NavListItem: React.VFC<Props> = ({ item, ...rest }) => {
  const router = useRouter()

  return (
    <ListItem {...rest}>
      <NextLink href={item.href} passHref>
        <Link
          display="flex"
          alignItems="center"
          px={PADDING_X}
          py={2}
          _hover={{
            bg: 'navigation.hover',
          }}
          {...(item.pathname === router.pathname
            ? { bg: 'navigation.selected' }
            : {})}
        >
          <Icon icon={item.icon} mr={PADDING_X} mt="-2px" />
          <Text fontSize="sm">{item.name}</Text>
        </Link>
      </NextLink>
    </ListItem>
  )
}
