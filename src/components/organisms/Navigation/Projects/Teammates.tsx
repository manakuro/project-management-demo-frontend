import React, { useCallback } from 'react'
import { Avatar, Wrap, WrapItem } from 'src/components/atoms'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { useClickableHover } from 'src/hooks'
import { useInviteModal } from 'src/components/organisms/Modals/InviteModal/useInviteModal'

type Teammate = {
  name: string
  image: string
}

type Props = {
  teammates: Teammate[]
}

export const Teammates: React.VFC<Props> = (props) => {
  const clickableStyle = useClickableHover()
  const { setIsOpen } = useInviteModal()

  const handleInvitePeople = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return (
    <Wrap p={2} px={PADDING_X}>
      {props.teammates.map((t, k) => (
        <WrapItem key={k}>
          <Avatar
            name={t.name}
            src={t.image}
            size="xs"
            cursor="pointer"
            bg="teal.200"
          />
        </WrapItem>
      ))}
      <WrapItem>
        <Avatar
          size="xs"
          cursor="pointer"
          bg="teal.200"
          {...clickableStyle}
          onClick={handleInvitePeople}
        />
      </WrapItem>
    </Wrap>
  )
}
