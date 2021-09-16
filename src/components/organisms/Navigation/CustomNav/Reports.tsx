import React from 'react'
import { CustomNavList } from './CustomNavList'

type Props = {}

export const Reports: React.VFC<Props> = () => {
  return (
    <CustomNavList
      item={{
        title: {
          expanded: 'Reports',
          shorten: 'Re',
        },
        listItems: [
          {
            name: "Tasks I've changed",
            href: '/',
            icon: 'idCard',
          },
        ],
      }}
    />
  )
}
