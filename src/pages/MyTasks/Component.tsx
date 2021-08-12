import React, { memo, useCallback, useEffect } from 'react'
import { Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader, Tabs, TabPanels, TabPanel } from 'src/components/organisms'
import {
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksFilesURL,
  isMyTasksURL,
  isTaskDetailURL,
  useRouter,
} from 'src/router'
import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { useMyTasksTabStatus } from 'src/store/app/myTasks/taskTabStatus'
import { Board } from './Board'
import { Header } from './Header'
import { List } from './List'
import { Provider } from './Provider'

type Props = {
  loading: boolean
}

const TASKS_INDEX = 0 as const
const BOARD_INDEX = 1 as const
const CALENDAR_INDEX = 2 as const
const FILES_INDEX = 3 as const
type Index =
  | typeof TASKS_INDEX
  | typeof BOARD_INDEX
  | typeof CALENDAR_INDEX
  | typeof FILES_INDEX

export const Component: React.VFC<Props> = memo<Props>((props) => {
  const {
    navigateToMyTasks,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    router,
  } = useRouter()
  const [tabIndex, setTabIndex] = React.useState<Index>(TASKS_INDEX)
  const { setTabStatus, isTaskTabStatus, tabStatus } = useMyTasksTabStatus()
  const { isSorted, onSort } = useMyTasksTaskStatus()

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case TASKS_INDEX: {
          setTabIndex(TASKS_INDEX)
          setTabStatus('list')
          await navigateToMyTasks()
          break
        }
        case BOARD_INDEX: {
          if (isSorted('project')) onSort('none')
          setTabIndex(BOARD_INDEX)
          setTabStatus('board')
          await navigateToMyTasksBoard()
          break
        }
        case CALENDAR_INDEX: {
          setTabIndex(CALENDAR_INDEX)
          setTabStatus('calendar')
          await navigateToMyTasksCalendar()
          break
        }
        case FILES_INDEX: {
          setTabIndex(FILES_INDEX)
          await navigateToMyTasksFiles()
          break
        }
      }
    },
    [
      isSorted,
      navigateToMyTasks,
      navigateToMyTasksBoard,
      navigateToMyTasksCalendar,
      navigateToMyTasksFiles,
      onSort,
      setTabStatus,
    ],
  )

  useEffect(() => {
    if (isTaskDetailURL(router)) {
      switch (true) {
        case isTaskTabStatus('list'): {
          setTabIndex(TASKS_INDEX)
          break
        }
        case isTaskTabStatus('board'): {
          setTabIndex(BOARD_INDEX)
          break
        }
        case isTaskTabStatus('calendar'): {
          setTabIndex(CALENDAR_INDEX)
          break
        }
      }
      return
    }
  }, [isTaskTabStatus, router])

  useEffect(() => {
    if (isMyTasksURL(router)) {
      setTabIndex(TASKS_INDEX)
      setTabStatus('list')
      return
    }
    if (isMyTasksBoardURL(router)) {
      if (isSorted('project')) onSort('none')
      setTabIndex(BOARD_INDEX)
      setTabStatus('board')
      return
    }
    if (isMyTasksCalendarURL(router)) {
      setTabIndex(CALENDAR_INDEX)
      setTabStatus('calendar')
      return
    }
    if (isMyTasksFilesURL(router)) {
      setTabIndex(FILES_INDEX)
      setTabStatus('files')
      return
    }
    // Include `tabStatus` to force update tab status based on URL regardless of API data
  }, [isSorted, onSort, router, setTabStatus, tabStatus])

  return (
    <Provider loading={props.loading}>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        flex={1}
        display="flex"
        isLazy
      >
        <Flex data-testid="MyTasks" flex={1} flexDirection="column">
          <Head title="My Tasks" />
          <MainHeader>
            <Header loading={props.loading} />
          </MainHeader>
          <Flex flex={1}>
            <TabPanels>
              <TabPanel>
                <List />
              </TabPanel>
              <TabPanel>
                <Board />
              </TabPanel>
              <TabPanel>
                <p>Calendar!</p>
              </TabPanel>
              <TabPanel>
                <p>Files!</p>
              </TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </Tabs>
    </Provider>
  )
})
Component.displayName = 'Component'
