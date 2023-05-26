import React, { memo } from 'react'
import { TaskDetailModal } from 'src/components/features/organisms/TaskDetails'
import {
  TasksFilesContent,
  TasksFilesList,
  TasksContainer,
} from 'src/components/features/organisms/Tasks'
import { useTasksFilesDetail } from 'src/components/features/organisms/Tasks/TasksFiles/useTasksFilesDetail'
import { Flex } from 'src/components/ui/atoms'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { isMyTasksDetailURL, getMyTasksDetailId, useRouter } from 'src/router'
import { SkeletonFiles } from './SkeletonFiles'

export const Files: React.FC = memo(() => {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  )
})

const Component: React.FC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useMyTasksContext()

  const { navigateToMyTasksFiles } = useRouter()

  useTasksFilesDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  if (tabContentLoading) return <SkeletonFiles />

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
