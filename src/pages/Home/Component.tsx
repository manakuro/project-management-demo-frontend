import React, { memo } from 'react'
import { Heading, Box, Stack } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader } from 'src/components/organisms/MainHeader'
import { FavoriteProjects } from './FavoriteProjects'
import { RecentProjects } from './RecentProjects'
import { TasksDueSoon } from './TasksDueSoon'

type Props = {}

export const Component: React.VFC<Props> = memo<Props>(() => {
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
