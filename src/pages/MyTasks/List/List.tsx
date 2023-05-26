import React, { memo } from 'react'
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
  TasksContainer,
} from 'src/components/organisms/Tasks'
import { Flex } from 'src/components/ui/atoms'
import { useMyTasksContext } from 'src/pages/MyTasks/Provider'
import { getMyTasksDetailId, isMyTasksDetailURL, useRouter } from 'src/router'
import { SortMenu } from '../TasksHeader'
import { SkeletonListContent, SkeletonListHeader } from './SkeletonList'

export const List: React.FC = memo(() => {
  return (
    <TasksContainer isMyTasksPage>
      <Component />
    </TasksContainer>
  )
})
const Component: React.FC = memo(() => {
  const {
    tabContentLoading,
    fetchTaskDetailQuery,
    contentLoading,
    startContentLoading,
    endContentLoading,
  } = useMyTasksContext()
  const { navigateToMyTasksList } = useRouter()
  const { hasClickedOutside } = useTasksListDetail({
    isTaskDetailURL: isMyTasksDetailURL,
    getTaskDetailId: getMyTasksDetailId,
    fetchQuery: fetchTaskDetailQuery,
  })

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
            <AddTaskButton solid />
          </TasksHeaderLeft>
          <TasksHeaderRight>
            <IncompleteTasksMenu
              startLoading={startContentLoading}
              endLoading={endContentLoading}
            />
            <SortMenu />
            <CustomizeButton />
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
        backToPage={navigateToMyTasksList}
        hasClickedOutside={hasClickedOutside}
      />
    </>
  )
})
List.displayName = 'List'
Component.displayName = 'Component'
