import React from 'react'
import { List } from 'src/components/atoms'
import { MAX_WIDTH } from '../Navigation'
import { InviteTeammates } from './InviteTeammates'
import { Help } from './Help'

export const Footer: React.VFC = () => {
  return (
    <List w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
    </List>
  )
}
