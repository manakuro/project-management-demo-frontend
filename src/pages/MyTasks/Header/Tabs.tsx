import type React from 'react'
import { memo } from 'react'
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Portal,
} from 'src/components/ui/atoms'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from 'src/components/ui/organisms/Menu'
import { Tab, TabList } from 'src/components/ui/organisms/Tabs'

export const Tabs: React.FC = memo(() => {
  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start" flexDirection="column">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            My Tasks
          </Heading>
          <Menu placement="bottom-start">
            <MenuButton
              ml={1}
              aria-label="expand button"
              as={IconButton}
              icon={<Icon icon="chevronDown" color="text.muted" />}
              variant="ghost"
            />
            <Portal>
              <MenuList color="text.base">
                <MenuItem>Sync to Calendar</MenuItem>
                <MenuItem>Add tasks via Email</MenuItem>
                <MenuItem>Export CSV</MenuItem>
                <MenuItem>Print</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
        <TabList>
          <Tab>List</Tab>
          <Tab>Board</Tab>
          <Tab>Calendar</Tab>
          <Tab>Files</Tab>
        </TabList>
      </Flex>
    </Flex>
  )
})
Tabs.displayName = 'Tabs'
