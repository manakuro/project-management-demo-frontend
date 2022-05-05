import React, { memo } from 'react'
import { List } from 'src/components/atoms'
import { MAX_WIDTH } from '../Navigation'
import { Help } from './Help'
import { InviteTeammates } from './InviteTeammates'
import { ResetToken } from './ResetToken'

export const Footer: React.VFC = memo(() => {
  return (
    <List w={MAX_WIDTH}>
      <InviteTeammates />
      <Help />
      {__DEV__ && <ResetToken />}
    </List>
  )
})
Footer.displayName = 'Footer'
