import React from 'react'
import { List } from 'src/components/atoms'
import { NavListItem } from 'src/components/organisms/Navigation/NavListItem'
import { NavListItem as TNavListItem } from 'src/components/organisms/Navigation/type'

const items: TNavListItem[] = [
  {
    name: 'Help with features',
    href: 'https://google.com',
    icon: 'bookOpen',
    isExternal: true,
  },
  {
    name: 'Contact support',
    href: 'https://google.com',
    icon: 'help',
    isExternal: true,
  },
  {
    name: 'Apps and integrations',
    href: 'https://google.com',
    icon: 'layerPlus',
    isExternal: true,
  },
  {
    name: 'Keyboard shortcuts',
    href: 'https://google.com',
    icon: 'gridHorizontal',
    isExternal: true,
  },
  {
    name: 'Download mobile app',
    href: 'https://google.com',
    icon: 'mobile',
    isExternal: true,
  },
]

export const Footer: React.VFC = () => {
  return (
    <List w="full" mb={3}>
      {items.map((n, i) => (
        <NavListItem key={i} item={n} />
      ))}
    </List>
  )
}
