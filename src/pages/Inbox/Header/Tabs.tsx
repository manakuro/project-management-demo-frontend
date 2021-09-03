import React, { memo } from 'react'
import { Flex, Heading } from 'src/components/atoms'
import { TabList, Tab } from 'src/components/organisms/Tabs'

export const Tabs: React.VFC = memo(() => {
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
