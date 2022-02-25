import React, { memo, useCallback, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import { TaskDetailModal } from 'src/components/organisms/TaskDetails'
import {
  TasksProvider,
  TasksFilesContent,
  TasksFilesList,
} from 'src/components/organisms/Tasks'
import { useTasksFilesDetail } from 'src/components/organisms/Tasks/TasksFiles/useTasksFilesDetail'
import { useProjectsFilesPageQuery } from 'src/hooks/queries/app'
import { useProjectsPageContext } from 'src/pages/Projects/Provider'
import { useRouter, isProjectsDetailURL, getProjectsDetailId } from 'src/router'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { SkeletonFiles } from './SkeletonFiles'

export const Files: React.VFC = memo(() => {
  return (
    <TasksProvider isProjectsPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { tabContentLoading, fetchTaskDetailQuery } = useProjectsPageContext()
  const { projectId } = useProjectsProjectId()
  const { loading: queryLoading } = useProjectsFilesPageQuery()
  const loading = useMemo(
    () => tabContentLoading || queryLoading,
    [tabContentLoading, queryLoading],
  )
  const { navigateToProjectsFiles } = useRouter()

  const backToPage = useCallback(async () => {
    await navigateToProjectsFiles(projectId)
  }, [navigateToProjectsFiles, projectId])

  useTasksFilesDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
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
      <TaskDetailModal backToPage={backToPage} />
    </>
  )
})
Component.displayName = 'Component'
Files.displayName = 'Files'
