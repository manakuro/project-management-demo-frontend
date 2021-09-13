import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { Head } from 'src/components/atoms/Head'
import { MainHeader } from 'src/components/organisms/MainHeader'
import { Tabs, TabPanels, TabPanel } from 'src/components/organisms/Tabs'
import { Activity } from './Activity'
import { Archive } from './Archive'
import { Header } from './Header'
import { Provider, useInboxPageContext } from './Provider'

type Props = {
  loading: boolean
}

const ACTIVITY_INDEX = 0 as const
const ARCHIVE_INDEX = 1 as const

type Index = typeof ACTIVITY_INDEX | typeof ARCHIVE_INDEX

export const Component: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Provider loading={props.loading}>
      <WrappedComponent />
    </Provider>
  )
})

const WrappedComponent: React.VFC = memo(() => {
  const { loadingQuery, setLoadingTabContent } = useInboxPageContext()
  const [tabIndex, setTabIndex] = React.useState<Index>(ACTIVITY_INDEX)

  const setLoading = useCallback(() => {
    setLoadingTabContent(true)
    setTimeout(() => {
      setLoadingTabContent(false)
    }, 200)
  }, [setLoadingTabContent])

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case ACTIVITY_INDEX: {
          setLoading()
          setTabIndex(ACTIVITY_INDEX)
          break
        }
        case ARCHIVE_INDEX: {
          setLoading()
          setTabIndex(ARCHIVE_INDEX)
          break
        }
      }
    },
    [setLoading],
  )

  return (
    <Tabs
      index={tabIndex}
      onChange={handleTabsChange}
      flex={1}
      display="flex"
      isLazy
    >
      <Flex data-testid="Inbox" flex={1} flexDirection="column">
        <Head title="inbox" />
        <MainHeader>
          <Header loading={loadingQuery} />
        </MainHeader>
        <Flex flex={1}>
          <TabPanels>
            <TabPanel>
              <Activity />
            </TabPanel>
            <TabPanel>
              <Archive />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  )
})
Component.displayName = 'Component'
