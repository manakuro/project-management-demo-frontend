import React, { memo } from 'react'
import { Flex, Stack } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useTaskFeedListItemContext } from '../Provider'
import { CreateAt } from './CreateAt'
import { FeedOptionMenu } from './FeedOptionMenu'
import { Like } from './Like'
import { Title } from './Title'

type Props = {}

export const Header: React.VFC<Props> = memo<Props>(() => {
  const { teammate } = useTaskFeedListItemContext()

  return (
    <Flex alignItems="center" flex={1}>
      <TeammateAvatar teammateId={teammate.id} size="xs" />
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
