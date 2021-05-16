import React, { memo } from 'react'
import { Avatar, AvatarProps } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms'
import { useMe } from 'src/store/me'

type Props = AvatarProps

export const MyAvatar: React.FC<Props> = memo((props) => {
  const { me } = useMe()

  return (
    <PopoverProfile
      profile={{
        name: me.name,
        image: me.image,
        email: me.email,
      }}
    >
      <Avatar
        name={me.name}
        src={me.image}
        size="xs"
        cursor="pointer"
        bg="teal.200"
        {...props}
      />
    </PopoverProfile>
  )
})
MyAvatar.displayName = 'MyAvatar'
