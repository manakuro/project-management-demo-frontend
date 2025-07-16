import type React from 'react'
import { memo } from 'react'
import { TaskDetailModal } from 'src/components/features/organisms/TaskDetails'
import { TasksProvider } from 'src/components/features/organisms/Tasks'
import { Flex, Stack } from 'src/components/ui/atoms'
import { Head } from 'src/components/ui/atoms/Head'
import { getHomeDetailId, isHomeDetailURL, useRouter } from 'src/router'
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

export const Component: React.FC<Props> = memo<Props>((props) => {
  const { fetchTaskDetailQuery } = props
  const { navigateToHome } = useRouter()

  useHomeTaskDetail({
    isTaskDetailURL: isHomeDetailURL,
    getTaskDetailId: getHomeDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  return (
    <TasksProvider isHomePage>
      <Flex flexDirection="column">
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
