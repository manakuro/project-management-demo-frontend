import React, { memo, useCallback, useState } from 'react'
import { Teammate } from 'src/store/entities/teammates'
import { BodyHeader } from '../BodyHeader'
import { BodyStack } from '../BodyStack'
import { InviteForm } from './InviteForm'

type Props = {
  projectId: string
  loading: boolean
  onSetMembersTab: () => void
}

export const Share: React.VFC<Props> = memo<Props>((props) => {
  const { projectId, onSetMembersTab } = props
  const [invitedTeammates, setInvitedTeammates] = useState<Teammate[]>([])

  const handleSetInvitedTeammates = useCallback((val: Teammate) => {
    setInvitedTeammates((s) => [...s, val])
  }, [])

  return (
    <BodyStack flex={1} px={6}>
      <BodyHeader>Invite with email</BodyHeader>
      {invitedTeammates.length ? null : (
        <InviteForm
          projectId={projectId}
          onSetMembersTab={onSetMembersTab}
          onSetInvitedTeammates={handleSetInvitedTeammates}
        />
      )}
    </BodyStack>
  )
})
Share.displayName = 'Share'
