import React from 'react'
import { Avatar, AvatarProps } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms/Popovers'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  teammateId: string
  showProfile?: boolean
} & AvatarProps

export const TeammateAvatar: React.VFC<Props> = (props) => {
  const { teammateId, showProfile, ...rest } = props
  const { teammate } = useTeammate(teammateId)

  if (!teammateId) {
    return <Avatar name="" src="" bg="teal.200" border="none" {...rest} />
  }

  if (!(showProfile ?? true)) {
    return (
      <Avatar
        name={teammate.name}
        src={teammate.image}
        bg="teal.200"
        border="none"
        {...rest}
      />
    )
  }

  return (
    <PopoverProfile
      profile={{
        name: teammate.name,
        image: teammate.image,
        email: teammate.email,
      }}
    >
      <Avatar
        name={teammate.name}
        src={teammate.image}
        bg="teal.200"
        border="none"
        {...rest}
      />
    </PopoverProfile>
  )
}
