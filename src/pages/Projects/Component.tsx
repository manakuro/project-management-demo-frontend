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
  useRouter,
} from 'src/router'
import { useMyTasksTaskStatus } from 'src/store/app/myTasks'
import { Board } from './Board'
import { Calendar } from './Calendar'
import { Files } from './Files'
import { Header } from './Header'
import { List } from './List'
import { Provider, useProjectsPageContext } from './Provider'

type Props = {
  loading: boolean
}

const OVERVIEW_INDEX = 0 as const
const LIST_INDEX = 1 as const
const BOARD_INDEX = 2 as const
const CALENDAR_INDEX = 3 as const
const FILES_INDEX = 4 as const
type Index =
  | typeof OVERVIEW_INDEX
  | typeof LIST_INDEX
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

const mapURLtoTabIndex = ({ router }: { router: NextRouter }): Index => {
  if (isMyTasksListURL(router)) return LIST_INDEX
  if (isMyTasksBoardURL(router)) return BOARD_INDEX
  if (isMyTasksCalendarURL(router)) return CALENDAR_INDEX
  if (isMyTasksFilesURL(router)) return FILES_INDEX
  return OVERVIEW_INDEX
}

const WrappedComponent: React.VFC = memo(() => {
  const {
    navigateToMyTasksList,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    router,
  } = useRouter()
  const { isSorted, onSort } = useMyTasksTaskStatus()
  const { loadingQuery, setLoadingTabContent } = useProjectsPageContext()
  const [tabIndex, setTabIndex] = React.useState<Index>(
    mapURLtoTabIndex({ router }),
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
        case LIST_INDEX: {
          setLoading()
          setTabIndex(LIST_INDEX)
          await navigateToMyTasksList()
          break
        }
        case BOARD_INDEX: {
          if (isSorted('project')) onSort('none')
          setLoading()
          setTabIndex(BOARD_INDEX)
          await navigateToMyTasksBoard()
          break
        }
        case CALENDAR_INDEX: {
          setLoading()
          setTabIndex(CALENDAR_INDEX)
          await navigateToMyTasksCalendar()
          break
        }
        case FILES_INDEX: {
          setLoading()
          setTabIndex(FILES_INDEX)
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
      onSort,
      setLoading,
    ],
  )

  useEffect(() => {
    if (isMyTasksListURL(router)) {
      return
    }
    if (isMyTasksBoardURL(router)) {
      if (isSorted('project')) onSort('none')
      return
    }
    if (isMyTasksCalendarURL(router)) {
      return
    }
    if (isMyTasksFilesURL(router)) {
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
      <Flex data-testid="Projects" flex={1} flexDirection="column">
        <Head title="Projects" />
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
Component.displayName = 'Component'
