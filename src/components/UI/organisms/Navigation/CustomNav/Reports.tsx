import React from 'react'
import { CustomNavList } from './CustomNavList'

type Props = {
  isExpanded: boolean
}

export const Reports: React.VFC<Props> = (props) => {
  return (
    <CustomNavList
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
