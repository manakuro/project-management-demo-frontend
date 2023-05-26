import React, { memo } from 'react'
import { TabList, Tab } from 'src/components/organisms/Tabs'
import { Flex, Heading } from 'src/components/ui/atoms'

export const Tabs: React.FC = memo(() => {
  return (
    <Flex mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            Inbox
          </Heading>
        </Flex>
        <TabList>
          <Tab>Activity</Tab>
          <Tab>Archive</Tab>
        </TabList>
      </Flex>
    </Flex>
  )
})
Tabs.displayName = 'Tabs'
