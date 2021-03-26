import React, { memo } from 'react'
import { MainHeader } from 'src/components/organisms'
import { Head } from 'src/components/atoms/Head'
import { Heading, Box, Stack } from 'src/components/atoms'
import { TasksDueSoon } from './TasksDueSoon'
import { RecentProjects } from './RecentProjects'
import { FavoriteProjects } from './FavoriteProjects'

type Props = {}

export const Component: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Box data-testid="Home">
      <Head title="Home" />
      <MainHeader>
        <Heading as="h2" size="md" fontWeight="semibold">
          Home
        </Heading>
      </MainHeader>
      <Box w="840px" mx="auto" py={10}>
        <Stack spacing={10}>
          <TasksDueSoon />
          <FavoriteProjects />
          <RecentProjects />
        </Stack>
      </Box>
    </Box>
  )
})
