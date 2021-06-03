import React, { memo } from 'react'
import { Avatar, AvatarProps, Flex } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms'
import { useMe } from 'src/store/entities/me'

type Props = AvatarProps

export const MyAvatar: React.FC<Props> = memo((props) => {
  const { me } = useMe()

  return (
    <Flex alignItems="center" h={9}>
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
    </Flex>
  )
})
MyAvatar.displayName = 'MyAvatar'
