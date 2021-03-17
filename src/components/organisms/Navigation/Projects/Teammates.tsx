import React, { useCallback } from 'react'
import { Avatar, Wrap, WrapItem } from 'src/components/atoms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useClickableHover } from 'src/hooks'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'
import { PopoverProfile } from 'src/components/organisms/Popovers/PopoverProfile'

type Teammate = {
  name: string
  image: string
  email: string
}

type Props = {
  teammates: Teammate[]
}

export const Teammates: React.VFC<Props> = (props) => {
  const { clickableHoverLightStyle } = useClickableHover()
  const inviteModal = useInviteModal()

  const handleInvitePeople = useCallback(() => {
    inviteModal.setIsOpen(true)
  }, [inviteModal])

  return (
    <Wrap p={2} px={PADDING_X}>
      {props.teammates.map((t, k) => (
        <WrapItem key={k}>
          <PopoverProfile profile={t}>
            <Avatar
              name={t.name}
              src={t.image}
              size="xs"
              cursor="pointer"
              bg="teal.200"
            />
          </PopoverProfile>
        </WrapItem>
      ))}
      <WrapItem>
        <Avatar
          size="xs"
          bg="teal.200"
          {...clickableHoverLightStyle}
          onClick={handleInvitePeople}
        />
      </WrapItem>
    </Wrap>
  )
}
