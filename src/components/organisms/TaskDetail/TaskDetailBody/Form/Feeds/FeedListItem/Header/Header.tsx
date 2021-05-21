import React, { memo } from 'react'
import { Avatar, Flex, Stack } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms'
import { useFeedListItem } from '../Provider'
import { CreateAt } from './CreateAt'
import { Title } from './Title'
import { Like } from './Like'
import { FeedOptionMenu } from './FeedOptionMenu'

type Props = {}

export const Header: React.VFC<Props> = memo<Props>(() => {
  const { teammate } = useFeedListItem()

  return (
    <Flex alignItems="center" flex={1}>
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
      <Title />
      <CreateAt />
      <Stack direction="row" ml="auto" spacing={2}>
        <Like />
        <FeedOptionMenu />
      </Stack>
    </Flex>
  )
})
Header.displayName = 'Header'
