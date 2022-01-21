import { NextRouter } from 'next/router'
import React, { memo, useCallback, useEffect } from 'react'
import { Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader } from 'src/components/organisms/MainHeader'
import { Tabs, TabPanels, TabPanel } from 'src/components/organisms/Tabs'
import {
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksFilesURL,
  isMyTasksListURL,
  isMyTasksDetailURL,
  useRouter,
} from 'src/router'
import { useMyTasksTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import {
  MyTasksTabStatus,
  MyTasksTabStatusCode,
  useMyTasksTabStatus,
  useMyTasksTabStatusCommand,
} from 'src/store/entities/myTasksTabStatus'
import { Board } from './Board'
import { Calendar } from './Calendar'
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

const mapURLtoTabStatus = ({
  router,
  tabStatus,
}: {
  router: NextRouter
  tabStatus: MyTasksTabStatus['status']
}): Index => {
  if (isMyTasksListURL(router)) return TASKS_INDEX
  if (isMyTasksBoardURL(router)) return BOARD_INDEX
  if (isMyTasksCalendarURL(router)) return CALENDAR_INDEX
  if (isMyTasksFilesURL(router)) return FILES_INDEX

  switch (tabStatus) {
    case MyTasksTabStatusCode.List:
      return TASKS_INDEX
    case MyTasksTabStatusCode.Board:
      return BOARD_INDEX
    case MyTasksTabStatusCode.Calendar:
      return CALENDAR_INDEX
    case MyTasksTabStatusCode.Files:
      return FILES_INDEX
  }

  return TASKS_INDEX
}

const WrappedComponent: React.VFC = memo(() => {
  const {
    navigateToMyTasksList,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    router,
  } = useRouter()
  const { isTabStatus, myTasksTabStatus } = useMyTasksTabStatus()
  const { setTabStatus } = useMyTasksTabStatusCommand()
  const { isSorted, sortBy } = useMyTasksTaskListStatus()
  const { loadingQuery, setLoadingTabContent } = useMyTasksContext()
  const [tabIndex, setTabIndex] = React.useState<Index>(
    mapURLtoTabStatus({ router, tabStatus: myTasksTabStatus.status }),
  )

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
          setTabStatus('List')
          await navigateToMyTasksList()
          break
        }
        case BOARD_INDEX: {
          if (isSorted('project')) sortBy('none')
          setLoading()
          setTabIndex(BOARD_INDEX)
          setTabStatus('Board')
          await navigateToMyTasksBoard()
          break
        }
        case CALENDAR_INDEX: {
          setLoading()
          setTabIndex(CALENDAR_INDEX)
          setTabStatus('Calendar')
          await navigateToMyTasksCalendar()
          break
        }
        case FILES_INDEX: {
          setLoading()
          setTabIndex(FILES_INDEX)
          setTabStatus('Files')
          await navigateToMyTasksFiles()
          break
        }
      }
    },
    [
      isSorted,
      navigateToMyTasksList,
      navigateToMyTasksBoard,
      navigateToMyTasksCalendar,
      navigateToMyTasksFiles,
      sortBy,
      setTabStatus,
      setLoading,
    ],
  )

  useEffect(() => {
    // When task detail opening
    if (isMyTasksDetailURL(router)) {
      switch (true) {
        case isTabStatus('List'): {
          setTabIndex(TASKS_INDEX)
          break
        }
        case isTabStatus('Board'): {
          setTabIndex(BOARD_INDEX)
          break
        }
        case isTabStatus('Calendar'): {
          setTabIndex(CALENDAR_INDEX)
          break
        }
        case isTabStatus('Files'): {
          setTabIndex(FILES_INDEX)
          break
        }
      }
      return
    }

    if (isMyTasksListURL(router)) {
      setTabStatus('List')
      return
    }
    if (isMyTasksBoardURL(router)) {
      if (isSorted('project')) sortBy('none')
      setTabStatus('Board')
      return
    }
    if (isMyTasksCalendarURL(router)) {
      setTabStatus('Calendar')
      return
    }
    if (isMyTasksFilesURL(router)) {
      setTabStatus('Files')
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
              <Calendar />
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
WrappedComponent.displayName = 'WrappedComponent'
Component.displayName = 'Component'
