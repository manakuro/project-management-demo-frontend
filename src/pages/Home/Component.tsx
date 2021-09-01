import React, { memo } from 'react'
import { Heading, Box, Stack } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader } from 'src/components/organisms/MainHeader'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import { useHomeDetail } from 'src/pages/Home/useHomeDetail'
import { isHomeDetailURL, useRouter, getHomeDetailId } from 'src/router'
import { FavoriteProjects } from './FavoriteProjects'
import { RecentProjects } from './RecentProjects'
import { SkeletonHome } from './SkeletonHome'
import { TasksDueSoon } from './TasksDueSoon'

type Props = {
  loading: boolean
}

export const Component: React.VFC<Props> = memo<Props>((props) => {
  const { navigateToHome } = useRouter()

  useHomeDetail({
    isTaskDetailURL: isHomeDetailURL,
    getTaskDetailId: getHomeDetailId,
  })

  return (
    <>
      <Box data-testid="Home">
        <Head title="Home" />
        <MainHeader>
          <Heading as="h2" size="md" fontWeight="semibold">
            Home
          </Heading>
        </MainHeader>
        {props.loading ? (
          <SkeletonHome />
        ) : (
          <Box w="840px" mx="auto" py={10}>
            <Stack spacing={10}>
              <TasksDueSoon />
              <FavoriteProjects />
              <RecentProjects />
            </Stack>
          </Box>
        )}
      </Box>
      <TaskDetailModal backToPage={navigateToHome} />
    </>
  )
})
Component.displayName = 'Component'
