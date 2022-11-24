import React from 'react'
import { List } from 'src/components/atoms'
import { NavListItem } from 'src/components/organisms/Navigation/NavListItem'
import { NavListItem as TNavListItem } from 'src/components/organisms/Navigation/type'

const items: TNavListItem[] = [
  {
    name: 'Video Tutorials',
    href: 'https://google.com',
    icon: 'playCircleOutline',
    isExternal: true,
  },
  {
    name: 'Training webinars',
    href: 'https://google.com',
    icon: 'movie',
    isExternal: true,
  },
  {
    name: 'Use case example',
    href: 'https://google.com',
    icon: 'shapePolygon',
    isExternal: true,
  },
]
export const Detail: React.FC = () => {
  return (
    <>
      <List w="full">
        {items.map((n, i) => (
          <NavListItem
            key={i}
            item={n}
            light
            linkStyle={{
              borderRadius: 'md',
            }}
          />
        ))}
      </List>
    </>
  )
}
