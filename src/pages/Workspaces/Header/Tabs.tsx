import React, { memo } from 'react'
import { TabList, Tab } from 'src/components/organisms/Tabs'
import { Flex, Heading } from 'src/components/ui/atoms'
import { useWorkspace } from 'src/store/entities/workspace'
import { FavoriteButton } from './FavoriteButton'

export const Tabs: React.FC = memo(() => {
  const { workspace } = useWorkspace()

  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            {workspace.name}
          </Heading>
          <FavoriteButton ml={2} />
        </Flex>
        <TabList>
          <Tab>Overview</Tab>
          <Tab isDisabled cursor="auto !important">
            Messages
          </Tab>
          <Tab isDisabled cursor="auto !important">
            Calendar
          </Tab>
        </TabList>
      </Flex>
    </Flex>
  )
})
Tabs.displayName = 'Tabs'
