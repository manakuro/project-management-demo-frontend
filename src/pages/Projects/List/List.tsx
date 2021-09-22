import React, { memo, useCallback } from 'react'
import { TaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import {
  AddTaskButton,
  CustomizeButton,
  IncompleteTasksButton,
  SortButton,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  TasksListBody,
  TasksListHeader,
  TasksListLayout,
  TasksListContent,
  TasksProvider,
  TasksListHorizontalScrollBorder,
  CustomizeMenu,
  useTasksListDetail,
} from 'src/components/organisms/Tasks'
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from 'src/router'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsPageContext } from '../Provider'
import { SkeletonList } from './SkeletonList'

export const List: React.VFC = memo(() => {
  return (
    <TasksProvider isProjectsPage>
      <Component />
    </TasksProvider>
  )
})
const Component: React.VFC = memo(() => {
  const { loadingTabContent } = useProjectsPageContext()
  const { projectId } = useProjectsProjectId()
  const { navigateToProjectsList } = useRouter()
  const { skipElement } = useTasksListDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
  })

  const backToPage = useCallback(async () => {
    await navigateToProjectsList(projectId)
  }, [navigateToProjectsList, projectId])

  if (loadingTabContent) return <SkeletonList />

  return (
    <>
      <TasksList>
        <TasksHeader>
          <TasksHeaderLeft>
            <AddTaskButton solid />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksButton />
            <SortButton />
            <CustomizeButton />
          </TasksHeaderRight>
        </TasksHeader>
        <TasksListContent>
          <TasksListHeader />
          <TasksListBody>
            <TasksListLayout />
          </TasksListBody>
          <TasksListHorizontalScrollBorder />
        </TasksListContent>
      </TasksList>
      <CustomizeMenu />
      <TaskDetailDrawer backToPage={backToPage} skipElement={skipElement} />
    </>
  )
})
List.displayName = 'List'
