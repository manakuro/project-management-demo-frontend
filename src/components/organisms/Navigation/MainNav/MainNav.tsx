import React, { memo } from 'react'
import { List } from 'src/components/atoms'
import { MAX_WIDTH } from '../Navigation'
import { Goals } from './Goals'
import { Home } from './Home'
import { Inbox } from './Inbox'
import { MyTasks } from './MyTasks'
import { Portfolios } from './Portfolios'

export const MainNav: React.VFC = memo(() => {
  return (
    <List w={MAX_WIDTH} mb={2}>
      <Home />
      <MyTasks />
      <Inbox />
      <Portfolios />
      <Goals />
    </List>
  )
})
MainNav.displayName = 'MainNav'
