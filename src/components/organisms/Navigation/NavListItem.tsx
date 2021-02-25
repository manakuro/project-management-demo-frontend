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
import { useLinkHover } from 'src/hooks/useLinkHover'

type Props = {
  item: TNavListItem
  selectedStyle: boolean
  light?: boolean
  linkStyle?: LinkProps
} & ListItemProps

export const NavListItem: React.VFC<Props> = (props) => {
  const { item, selectedStyle, linkStyle, light, ...rest } = props
  const router = useRouter()
  const { _hover, selected } = useLinkHover()

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
          _hover={_hover}
          {...(selectedStyle && item.pathname === router.pathname
            ? selected
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
