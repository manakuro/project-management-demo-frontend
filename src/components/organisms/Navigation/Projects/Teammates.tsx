import React, { memo, useCallback } from 'react'
import { Wrap, WrapItem } from 'src/components/atoms'
import { useInviteModal } from 'src/components/organisms/Modals'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useClickableHoverStyle } from 'src/hooks'
import { useTeammates } from 'src/store/entities/teammate'
import { Teammate } from './Teammate'

type Props = {}

export const Teammates: React.VFC<Props> = memo(() => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const inviteModal = useInviteModal()
  const { teammateIds } = useTeammates()

  const handleInvitePeople = useCallback(() => {
    inviteModal.setIsOpen(true)
  }, [inviteModal])

  return (
    <Wrap p={2} px={PADDING_X}>
      {teammateIds.map((t) => (
        <Teammate teammateId={t} key={t} />
      ))}
      <WrapItem>
        <TeammateAvatar
          teammateId=""
          size="xs"
          bg="teal.200"
          {...clickableHoverLightStyle}
          onClick={handleInvitePeople}
        />
      </WrapItem>
    </Wrap>
  )
})
Teammates.displayName = 'Teammates'
