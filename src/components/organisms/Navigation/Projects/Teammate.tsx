import React from 'react'
import { Avatar, WrapItem } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms/Popovers/PopoverProfile'
import { useTeammate } from 'src/store/entities/teammates'

type Props = {
  teammateId: string
}

export const Teammate: React.VFC<Props> = (props) => {
  const { teammate } = useTeammate(props.teammateId)

  return (
    <WrapItem>
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
    </WrapItem>
  )
}
