import React, { memo } from 'react'
import { PopoverProfile } from 'src/components/organisms/Popovers'
import { Avatar, AvatarProps } from 'src/components/ui/atoms'
import { useMe } from 'src/store/entities/me'

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
        cursor="pointer"
        bg="teal.200"
        {...props}
      />
    </PopoverProfile>
  )
})
MyAvatar.displayName = 'MyAvatar'
