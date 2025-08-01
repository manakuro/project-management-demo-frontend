import { PopoverProfile } from '@/components/features/organisms/Popovers';
import { Avatar, type AvatarProps } from '@/components/ui/atoms';
import { useMe } from '@/store/entities/me';
import type React from 'react';
import { memo } from 'react';

type Props = AvatarProps;

export const MyAvatar: React.FC<Props> = memo((props) => {
  const { me } = useMe();

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
  );
});
MyAvatar.displayName = 'MyAvatar';
