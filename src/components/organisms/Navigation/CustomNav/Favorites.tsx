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
            href: 'home',
            icon: 'idCard',
            pathname: '/',
          },
          {
            name: 'All Items',
            href: 'favorites/all-items',
            icon: 'gridAlt',
            pathname: '/',
          },
          {
            name: 'Deleted Items',
            href: 'favorites/deleted-items',
            icon: 'trashAlt',
            pathname: '/',
          },
        ],
      }}
    />
  )
}
