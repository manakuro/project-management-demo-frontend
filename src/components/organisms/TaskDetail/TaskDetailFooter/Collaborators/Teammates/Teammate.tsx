import React from 'react'
import { Avatar } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms/Popovers/PopoverProfile'
import { useTeammate } from 'src/store/teammates'

type Props = {
  teammateId: string
}

export const Teammate: React.VFC<Props> = (props) => {
  const { teammate } = useTeammate(props.teammateId)

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
        size="xs"
        cursor="pointer"
        bg="teal.200"
      />
    </PopoverProfile>
  )
}
