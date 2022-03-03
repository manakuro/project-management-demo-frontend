import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { TaskDetailDrawer } from 'src/components/organisms/TaskDetails'
import {
  AddTaskButton,
  CustomizeButton,
  IncompleteTasksMenu,
  TasksHeader,
  TasksHeaderLeft,
  TasksHeaderRight,
  TasksList,
  TasksListBody,
  TasksListHeader,
  TasksListLayout,
  TasksListContent,
  TasksListHorizontalScrollBorder,
  CustomizeMenu,
  useTasksListDetail,
  MoreActionMenu,
  TasksContainer,
} from 'src/components/organisms/Tasks'
import { getProjectsDetailId, isProjectsDetailURL, useRouter } from 'src/router'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useProjectsPageContext } from '../Provider'
import { SortMenu } from '../TasksHeader'
import { SkeletonListContent, SkeletonListHeader } from './SkeletonList'

export const List: React.VFC = memo(() => {
  return (
    <TasksContainer isProjectsPage>
      <Component />
    </TasksContainer>
  )
})
const Component: React.VFC = memo(() => {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    contentLoading,
    startContentLoading,
    endContentLoading,
  } = useProjectsPageContext()
  const { projectId } = useProjectsProjectId()
  const { navigateToProjectsList } = useRouter()
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isProjectsDetailURL,
    getTaskDetailId: getProjectsDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

  const backToPage = useCallback(async () => {
    await navigateToProjectsList(projectId)
  }, [navigateToProjectsList, projectId])

  if (tabContentLoading)
    return (
      <Flex flex={1} flexDirection="column">
        <SkeletonListHeader />
        <SkeletonListContent />
      </Flex>
    )

  return (
    <>
      <TasksList>
        <TasksHeader>
          <TasksHeaderLeft>
            <AddTaskButton />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
            <MoreActionMenu />
          </TasksHeaderRight>
        </TasksHeader>
        {contentLoading ? (
          <SkeletonListContent />
        ) : (
          <TasksListContent>
            <TasksListHeader />
            <TasksListBody>
              <TasksListLayout />
            </TasksListBody>
            <TasksListHorizontalScrollBorder />
          </TasksListContent>
        )}
      </TasksList>
      <CustomizeMenu />
      <TaskDetailDrawer
        backToPage={backToPage}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  )
})
List.displayName = 'List'
Component.displayName = 'Component'
