import React, { memo, useCallback, useEffect } from 'react'
import { Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader, Tabs, TabPanels, TabPanel } from 'src/components/organisms'
import {
  isMyTasksBoardURL,
  isMyTasksCalendarURL,
  isMyTasksFilesURL,
  isMyTasksURL,
  useRouter,
} from 'src/router'
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
    navigateToTasks,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    router,
  } = useRouter()
  const [tabIndex, setTabIndex] = React.useState<Index>(TASKS_INDEX)

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case TASKS_INDEX: {
          await navigateToTasks()
          break
        }
        case BOARD_INDEX: {
          await navigateToMyTasksBoard()
          break
        }
        case CALENDAR_INDEX: {
          await navigateToMyTasksCalendar()
          break
        }
        case FILES_INDEX: {
          await navigateToMyTasksFiles()
          break
        }
      }
    },
    [
      navigateToMyTasksBoard,
      navigateToMyTasksCalendar,
      navigateToMyTasksFiles,
      navigateToTasks,
    ],
  )

  useEffect(() => {
    if (isMyTasksURL(router)) {
      setTabIndex(TASKS_INDEX)
      return
    }
    if (isMyTasksBoardURL(router)) {
      setTabIndex(BOARD_INDEX)
      return
    }
    if (isMyTasksCalendarURL(router)) {
      setTabIndex(CALENDAR_INDEX)
      return
    }
    if (isMyTasksFilesURL(router)) {
      setTabIndex(FILES_INDEX)
      return
    }
  }, [router])

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
            <Header />
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
