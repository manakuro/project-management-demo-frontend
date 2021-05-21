import React, { memo } from 'react'
import { Avatar, Flex, Text } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms'
import { useFeed } from './Provider'
import { formatCreatedAt } from 'src/shared/date'

type Props = {}

export const Header: React.VFC<Props> = memo<Props>(() => {
  const { teammate, feed } = useFeed()

  return (
    <Flex alignItems="center">
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
      <Text fontSize="sm" fontWeight="medium" ml={2}>
        {teammate.name}
      </Text>
      <Text fontSize="xs" color="text.muted" ml={2}>
        {formatCreatedAt(feed.createdAt)}
        {feed.updatedAt ? ' (edited)' : ''}
      </Text>
    </Flex>
  )
})
Header.displayName = 'Header'
