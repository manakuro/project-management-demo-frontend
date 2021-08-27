import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import {
  TasksProvider,
  TasksFilesContent,
  TasksFilesList,
} from 'src/components/organisms/Tasks'
import { useTasksFilesDetail } from 'src/components/organisms/Tasks/TasksFiles/useTasksFilesDetail'
import { useMyTasksFilesQuery } from 'src/hooks/queries/useMyTasksFilesQuery'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { isTaskDetailURL, getTaskDetailId, useRouter } from 'src/router'
import { SkeletonFiles } from './SkeletonFiles'

export const Files: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useMyTasksContext()
  const { loading: loadingQuery } = useMyTasksFilesQuery()
  const loading = useMemo(
    () => loadingTabContent || loadingQuery,
    [loadingTabContent, loadingQuery],
  )
  const { navigateToMyTasksFiles } = useRouter()

  useTasksFilesDetail({
    isTaskDetailURL,
    getTaskDetailId,
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
Files.displayName = 'Files'
