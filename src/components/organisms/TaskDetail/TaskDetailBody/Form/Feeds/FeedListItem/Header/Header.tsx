import React, { memo } from 'react'
import { Avatar, Flex } from 'src/components/atoms'
import { PopoverProfile } from 'src/components/organisms'
import { useFeedListItem } from '../Provider'
import { CreateAt } from './CreateAt'
import { Title } from './Title'

type Props = {}

export const Header: React.VFC<Props> = memo<Props>(() => {
  const { teammate } = useFeedListItem()

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
      <Title />
      <CreateAt />
    </Flex>
  )
})
Header.displayName = 'Header'
