import React from 'react'
import { MainList } from './MainList'

type Props = {
  isExpanded: boolean
}

export const Reports: React.VFC<Props> = (props) => {
  return (
    <MainList
      isExpanded={props.isExpanded}
      item={{
        title: {
          expanded: 'Reports',
          shorten: 'Re',
        },
        listItems: [
          {
            name: "Tasks I've changed",
            href: 'home',
            icon: 'idCard',
            pathname: '/',
          },
        ],
      }}
    />
  )
}
