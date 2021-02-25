import React from 'react'
import {
  Text,
  ListItem,
  Link,
  NextLink,
  Icon,
  ListItemProps,
  LinkProps,
} from 'src/components/atoms'
import { useRouter } from 'next/router'
import { PADDING_X } from './Navigation'
import { NavListItem as TNavListItem } from './type'
import { Routes } from 'src/router'

type Props = {
  item: TNavListItem
  selectedStyle: boolean
  light?: boolean
  linkStyle?: LinkProps
} & ListItemProps

export const NavListItem: React.VFC<Props> = (props) => {
  const { item, selectedStyle, linkStyle, ...rest } = props
  const router = useRouter()
  const hoverBg = props.light
    ? 'navigation.hover.light'
    : 'navigation.hover.dark'

  return (
    <ListItem {...rest}>
      <WithNextLink {...props}>
        <Link
          href={item.href}
          isExternal={item.isExternal ?? false}
          display="flex"
          alignItems="center"
          px={PADDING_X}
          py={2}
          _hover={{
            bg: hoverBg,
          }}
          {...(selectedStyle && item.pathname === router.pathname
            ? { bg: 'navigation.selected' }
            : {})}
          {...linkStyle}
        >
          <Icon icon={item.icon} mr={PADDING_X} mt="-2px" />
          <Text fontSize="sm">{item.name}</Text>
        </Link>
      </WithNextLink>
    </ListItem>
  )
}

const WithNextLink: React.FC<Props> = (props) => {
  return props.item.isExternal ? (
    <>{props.children}</>
  ) : (
    <NextLink href={props.item.href as Routes} passHref>
      {props.children}
    </NextLink>
  )
}
