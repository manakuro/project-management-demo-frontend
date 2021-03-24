import React, { memo } from 'react'
import { List } from 'src/components/atoms'
import { MAX_WIDTH } from '../Navigation'
import { InviteTeammates } from './InviteTeammates'
import { Help } from './Help'

export const Footer: React.VFC = memo(() => {
  return (
    <List w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
    </List>
  )
})
