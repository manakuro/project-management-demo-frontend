import React, { memo } from 'react'
import { Flex, Heading, Icon, IconButton, Portal } from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  TabList,
  Tab,
} from 'src/components/organisms'
import { useClickableHover } from 'src/hooks'

export const Tabs: React.VFC = memo(() => {
  const { clickableHoverLightStyle } = useClickableHover()

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
        <TabList borderBottom="none">
          <Tab
            px={0}
            mr={4}
            mb={0}
            {...clickableHoverLightStyle}
            fontWeight="medium"
          >
            List
          </Tab>
          <Tab
            px={0}
            mr={4}
            mb={0}
            {...clickableHoverLightStyle}
            fontWeight="medium"
          >
            Calendar
          </Tab>
          <Tab
            px={0}
            mr={4}
            mb={0}
            {...clickableHoverLightStyle}
            fontWeight="medium"
          >
            Files
          </Tab>
        </TabList>
      </Flex>
    </Flex>
  )
})
