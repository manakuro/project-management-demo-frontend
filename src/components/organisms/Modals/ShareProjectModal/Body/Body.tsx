import React, { memo, useCallback, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { ModalBody } from 'src/components/organisms/Modal'
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from 'src/components/organisms/Tabs'
import { Index, MEMBERS_INDEX, SHARE_INDEX } from '../types'
import { Share } from './Share'

type Props = {
  projectId: string
  initialTabIndex: Index
}

export const Body: React.VFC<Props> = memo<Props>((props) => {
  const { projectId, initialTabIndex } = props
  const [tabIndex, setTabIndex] = useState<Index>(initialTabIndex)
  const [loadingTabContent, setLoadingTabContent] = useState<boolean>(true)

  const setLoading = useCallback(() => {
    setLoadingTabContent(true)
    setTimeout(() => {
      setLoadingTabContent(false)
    }, 200)
  }, [setLoadingTabContent])

  const setShareTab = useCallback(() => {
    setLoading()
    setTabIndex(SHARE_INDEX)
  }, [setLoading])

  const setMembersTab = useCallback(() => {
    setLoading()
    setTabIndex(MEMBERS_INDEX)
  }, [setLoading])

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case SHARE_INDEX: {
          setShareTab()
          break
        }
        case MEMBERS_INDEX: {
          setMembersTab()
          break
        }
      }
    },
    [setMembersTab, setShareTab],
  )

  return (
    <ModalBody p={0}>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        flex={1}
        display="flex"
        isLazy
      >
        <Flex flex={1} flexDirection="column">
          <Flex borderBottom="1px" borderColor="gray.200" px={6}>
            <TabList>
              <Tab>Share</Tab>
              <Tab>Members</Tab>
            </TabList>
          </Flex>
          <Flex flex={1} px={6} py={4} minH="300px">
            <TabPanels>
              <TabPanel>
                <Share
                  projectId={projectId}
                  loading={loadingTabContent}
                  onSetMembersTab={setMembersTab}
                />
              </TabPanel>
              <TabPanel>hey2</TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </Tabs>
    </ModalBody>
  )
})
Body.displayName = 'Body'
