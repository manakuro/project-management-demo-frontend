import React from 'react'
import { MainList } from './MainList'

type Props = {
  isExpanded: boolean
}

export const Favorites: React.VFC<Props> = (props) => {
  return (
    <MainList
      isExpanded={props.isExpanded}
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
            href: 'home',
            icon: 'gridAlt',
            pathname: '/',
          },
          {
            name: 'Deleted Items',
            href: 'home',
            icon: 'trashAlt',
            pathname: '/',
          },
        ],
      }}
    />
  )
}
