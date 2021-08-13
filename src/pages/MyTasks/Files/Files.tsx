import React, { memo, useMemo } from 'react'
import { Flex } from 'src/components/atoms'
import {
  TasksProvider,
  TasksFilesContent,
  TasksFilesList,
} from 'src/components/organisms'
import { useMyTasksFilesQuery } from 'src/hooks/queries/useMyTasksFilesQuery'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { SkeletonFiles } from './SkeletonFiles'

export const Files: React.VFC = memo(() => {
  return (
    <TasksProvider isMyTasksPage>
      <Component />
    </TasksProvider>
  )
})

const Component: React.VFC = memo(() => {
  const { loadingPage } = useMyTasksContext()
  const { loading: loadingQuery } = useMyTasksFilesQuery()
  const loading = useMemo(
    () => loadingPage || loadingQuery,
    [loadingPage, loadingQuery],
  )

  if (loading) return <SkeletonFiles />

  return (
    <>
      <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
        <TasksFilesContent>
          <TasksFilesList />
        </TasksFilesContent>
      </Flex>
    </>
  )
})
Files.displayName = 'Files'
