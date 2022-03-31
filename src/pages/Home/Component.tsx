import React, { memo } from 'react'
import { Stack, Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import { TasksProvider } from 'src/components/organisms/Tasks'
import { isHomeDetailURL, useRouter, getHomeDetailId } from 'src/router'
import { Content } from './Content'
import { FavoriteProjects } from './FavoriteProjects'
import { Header } from './Header'
import { RecentProjects } from './RecentProjects'
import { SkeletonHome } from './SkeletonHome'
import { TasksDueSoon } from './TasksDueSoon'
import { useHomeTaskDetail } from './hooks'

type Props = {
  loading: boolean
  fetchTaskDetailQuery: (variables: { taskId: string }) => Promise<void>
}

export const Component: React.VFC<Props> = memo<Props>((props) => {
  const { fetchTaskDetailQuery } = props
  const { navigateToHome } = useRouter()

  useHomeTaskDetail({
    isTaskDetailURL: isHomeDetailURL,
    getTaskDetailId: getHomeDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  return (
    <TasksProvider isMyTasksPage>
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
    </TasksProvider>
  )
})
Component.displayName = 'Component'
