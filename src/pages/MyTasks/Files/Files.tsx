import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import {
  TasksFilesContent,
  TasksFilesList,
  TasksContainer,
} from 'src/components/organisms/Tasks'
import { useTasksFilesDetail } from 'src/components/organisms/Tasks/TasksFiles/useTasksFilesDetail'
import { useMyTasksFilesPageQuery } from 'src/hooks/queries/app'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { isMyTasksDetailURL, getMyTasksDetailId, useRouter } from 'src/router'
import { SkeletonFiles } from './SkeletonFiles'

export const Files: React.VFC = memo(() => {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  )
})

const Component: React.VFC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useMyTasksContext()
  const { loading: queryLoading } = useMyTasksFilesPageQuery()
  const loading = useMemo(
    () => tabContentLoading || queryLoading,
    [tabContentLoading, queryLoading],
  )
  const { navigateToMyTasksFiles } = useRouter()

  useTasksFilesDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  if (loading) return <SkeletonFiles />

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksFilesContent>
          <TasksFilesList />
        </TasksFilesContent>
      </Flex>
      <TaskDetailModal backToPage={navigateToMyTasksFiles} />
    </>
  )
})
Component.displayName = 'Component'
Files.displayName = 'Files'
