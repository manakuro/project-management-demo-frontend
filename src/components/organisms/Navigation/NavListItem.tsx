import React, { memo } from 'react'
import {
  Text,
  ListItem,
  Link,
  NextLink,
  Icon,
  ListItemProps,
  LinkProps,
} from 'src/components/atoms'
import { useLinkHoverStyle } from 'src/hooks'
import { Routes } from 'src/router'
import { PADDING_X } from './Navigation'
import { NavListItem as TNavListItem } from './type'

type Props = {
  item: TNavListItem
  selectedStyle: boolean
  light?: boolean
  linkStyle?: LinkProps
  pathname?: string
} & ListItemProps

export const NavListItem: React.VFC<Props> = memo<Props>((props) => {
  const { item, selectedStyle, linkStyle, light, pathname, ...rest } = props
  const { _hover, selected } = useLinkHoverStyle()

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
          {...(selectedStyle && item.isCurrentRoute?.(pathname || '')
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
})
NavListItem.displayName = 'NavListItem'

const WithNextLink: React.FC<Props> = (props) => {
  return props.item.isExternal ? (
    <>{props.children}</>
  ) : (
    <NextLink href={props.item.href as Routes} passHref>
      {props.children}
    </NextLink>
  )
}
