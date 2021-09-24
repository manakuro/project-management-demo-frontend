import React, { memo, useCallback } from 'react'
import { uniqBy } from 'src/shared/utils'
import { Teammate } from 'src/store/entities/teammates'
import { useShareProjectModalInvitedTeammates } from '../../useShareProjectModalInvitedTeammates'
import { BodyHeader } from '../BodyHeader'
import { BodyStack } from '../BodyStack'
import { InviteForm } from './InviteForm'
import { SendForm } from './SendForm'

type Props = {
  projectId: string
  loading: boolean
  onSetMembersTab: () => void
}

export const Share: React.VFC<Props> = memo<Props>((props) => {
  const { projectId, onSetMembersTab } = props
  const { invitedTeammates, setInvitedTeammates } =
    useShareProjectModalInvitedTeammates()

  const handleSetInvitedTeammates = useCallback(
    (val: Teammate) => {
      setInvitedTeammates((s) => uniqBy([...s, val], 'id'))
    },
    [setInvitedTeammates],
  )

  const handleDeleteInvitedTeammate = useCallback(
    (teammateId: string) => {
      setInvitedTeammates((s) => s.filter((t) => t.id !== teammateId))
    },
    [setInvitedTeammates],
  )

  return (
    <BodyStack flex={1} px={6}>
      <BodyHeader>Invite with email</BodyHeader>
      {invitedTeammates.length ? (
        <SendForm
          projectId={projectId}
          onSetInvitedTeammates={handleSetInvitedTeammates}
          invitedTeammates={invitedTeammates}
          onDeleteInvitedTeammate={handleDeleteInvitedTeammate}
        />
      ) : (
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
