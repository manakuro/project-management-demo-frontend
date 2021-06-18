import React from 'react'
import { Avatar, AvatarProps } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  teammateId: string
} & AvatarProps

export const TeammateAvatar: React.VFC<Props> = (props) => {
  const { teammateId, ...rest } = props
  const { teammate } = useTeammate(teammateId)

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
