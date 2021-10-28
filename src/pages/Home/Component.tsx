import React, { memo } from 'react'
import { Stack, Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import { isHomeDetailURL, useRouter, getHomeDetailId } from 'src/router'
import { Content } from './Content'
import { FavoriteProjects } from './FavoriteProjects'
import { Header } from './Header'
import { RecentProjects } from './RecentProjects'
import { SkeletonHome } from './SkeletonHome'
import { TasksDueSoon } from './TasksDueSoon'
import { useHomeDetail } from './hooks'

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
      <Flex data-testid="Home" flexDirection="column">
        <Head title="Home" />
        <Header />
        {props.loading ? (
          <SkeletonHome />
        ) : (
          <Content>
            <Stack spacing={10} w="full">
              <TasksDueSoon />
              <FavoriteProjects />
              <RecentProjects />
            </Stack>
          </Content>
        )}
      </Flex>
      <TaskDetailModal backToPage={navigateToHome} />
    </>
  )
})
Component.displayName = 'Component'
