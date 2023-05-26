import React, { memo, useCallback, useState } from 'react'
import { ModalBody } from 'src/components/organisms/Modal'
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from 'src/components/organisms/Tabs'
import { Flex } from 'src/components/ui/atoms'
import { Index, MEMBERS_INDEX, SHARE_INDEX } from '../types'
import { useShareProjectModal } from '../useShareProjectModal'
import { Members } from './Members'
import { Share } from './Share'

type Props = {
  projectId: string
}

export const Body: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { tabIndex, setMembersTab, setShareTab } = useShareProjectModal()
  const [loadingTabContent, setLoadingTabContent] = useState<boolean>(true)

  const setLoading = useCallback(() => {
    setLoadingTabContent(true)
    setTimeout(() => {
      setLoadingTabContent(false)
    }, 200)
  }, [setLoadingTabContent])

  const handleTabsChange = useCallback(
    async (index: number) => {
      switch (index as Index) {
        case SHARE_INDEX: {
          setLoading()
          setShareTab()
          break
        }
        case MEMBERS_INDEX: {
          setLoading()
          setMembersTab()
          break
        }
      }
    },
    [setLoading, setMembersTab, setShareTab],
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
          <Flex flex={1} py={4} minH="300px" maxH="300px" overflow="scroll">
            <TabPanels>
              <TabPanel>
                <Share
                  projectId={projectId}
                  loading={loadingTabContent}
                  onSetMembersTab={setMembersTab}
                />
              </TabPanel>
              <TabPanel>
                <Members
                  projectId={projectId}
                  loading={loadingTabContent}
                  onSetShareTab={setShareTab}
                />
              </TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </Tabs>
    </ModalBody>
  )
})
Body.displayName = 'Body'
