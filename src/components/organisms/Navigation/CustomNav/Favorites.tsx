import React from 'react'
import { CustomNavList } from './CustomNavList'

type Props = {}

export const Favorites: React.VFC<Props> = () => {
  return (
    <CustomNavList
      item={{
        title: {
          expanded: 'Favorites',
          shorten: 'Fav',
        },
        listItems: [
          {
            name: 'Engineering',
            href: '/',
            icon: 'idCard',
          },
          {
            name: 'All Items',
            href: '/',
            icon: 'gridAlt',
          },
          {
            name: 'Deleted Items',
            href: '/',
            icon: 'trashAlt',
          },
        ],
      }}
    />
  )
}
