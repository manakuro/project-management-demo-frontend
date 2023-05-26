import React, { memo, useCallback } from 'react'
import { MainHeader } from 'src/components/organisms/MainHeader'
import { Tabs, TabPanels, TabPanel } from 'src/components/organisms/Tabs'
import { Flex } from 'src/components/ui/atoms'
import { Head } from 'src/components/ui/atoms/Head'
import { useRouter } from 'src/router'
import { Activity } from './Activity'
import { Archive } from './Archive'
import { Header } from './Header'
import { Provider, useInboxPageContext } from './Provider'

type Props = {}

const ACTIVITY_INDEX = 0 as const
const ARCHIVE_INDEX = 1 as const

type Index = typeof ACTIVITY_INDEX | typeof ARCHIVE_INDEX

export const Component: React.FC<Props> = memo<Props>(() => {
  return (
    <Provider>
      <WrappedComponent />
    </Provider>
  )
})

const WrappedComponent: React.FC = memo(() => {
  const { setLoadingTabContent } = useInboxPageContext()
  const [tabIndex, setTabIndex] = React.useState<Index>(ACTIVITY_INDEX)
  const { navigateToInbox } = useRouter()

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
          await navigateToInbox()
          setTabIndex(ACTIVITY_INDEX)

          break
        }
        case ARCHIVE_INDEX: {
          setLoading()
          await navigateToInbox()
          setTabIndex(ARCHIVE_INDEX)
          break
        }
      }
    },
    [setLoading, navigateToInbox],
  )

  return (
    <Tabs
      index={tabIndex}
      onChange={handleTabsChange}
      flex={1}
      display="flex"
      isLazy
    >
      <Flex data-testid="Inbox" flex={1} flexDirection="column" maxW="full">
        <Head title="inbox" />
        <MainHeader>
          <Header />
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
WrappedComponent.displayName = 'WrappedComponent'
Component.displayName = 'Component'
