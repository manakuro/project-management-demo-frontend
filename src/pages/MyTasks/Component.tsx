import { NextRouter } from 'next/router'
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
import { useTabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks'
import { Board } from './Board'
import { Files } from './Files'
import { Header } from './Header'
import { List } from './List'
import { Provider, useMyTasksContext } from './Provider'

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
  return (
    <Provider loading={props.loading}>
      <WrappedComponent />
    </Provider>
  )
})

const mapURLtoTabStatus = (router: NextRouter): Index => {
  if (isMyTasksBoardURL(router)) return BOARD_INDEX
  if (isMyTasksCalendarURL(router)) return CALENDAR_INDEX
  if (isMyTasksFilesURL(router)) return FILES_INDEX

  return TASKS_INDEX
}

const WrappedComponent: React.VFC = memo(() => {
  const {
    navigateToMyTasks,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    router,
  } = useRouter()
  const [tabIndex, setTabIndex] = React.useState<Index>(
    mapURLtoTabStatus(router),
  )
  const { setTabStatus, isTaskTabStatus } = useTabStatusForMyTasks()
  const { isSorted, onSort } = useMyTasksTaskStatus()
  const { loadingQuery, setLoadingTabContent } = useMyTasksContext()

  const setLoading = useCallback(() => {
    setLoadingTabContent(true)
    setTimeout(() => {
      setLoadingTabContent(false)
    }, 200)
  }, [setLoadingTabContent])

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case TASKS_INDEX: {
          setLoading()
          setTabIndex(TASKS_INDEX)
          setTabStatus('list')
          await navigateToMyTasks()
          break
        }
        case BOARD_INDEX: {
          if (isSorted('project')) onSort('none')
          setLoading()
          setTabIndex(BOARD_INDEX)
          setTabStatus('board')
          await navigateToMyTasksBoard()
          break
        }
        case CALENDAR_INDEX: {
          setLoading()
          setTabIndex(CALENDAR_INDEX)
          setTabStatus('calendar')
          await navigateToMyTasksCalendar()
          break
        }
        case FILES_INDEX: {
          setLoading()
          setTabIndex(FILES_INDEX)
          setTabStatus('files')
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
      setLoading,
    ],
  )

  useEffect(() => {
    // When task detail opening
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
        case isTaskTabStatus('files'): {
          setTabIndex(FILES_INDEX)
          break
        }
      }
      return
    }

    if (isMyTasksURL(router)) {
      setTabStatus('list')
      return
    }
    if (isMyTasksBoardURL(router)) {
      if (isSorted('project')) onSort('none')
      setTabStatus('board')
      return
    }
    if (isMyTasksCalendarURL(router)) {
      setTabStatus('calendar')
      return
    }
    if (isMyTasksFilesURL(router)) {
      setTabStatus('files')
      return
    }
    // Force update tab status based on URL
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return (
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
          <Header loading={loadingQuery} />
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
              <Files />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  )
})
Component.displayName = 'Component'
