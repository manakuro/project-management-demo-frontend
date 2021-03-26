import React, { memo } from 'react'
import { Flex, Heading, Icon, IconButton, Portal } from 'src/components/atoms'
import { Menu, MenuButton, MenuItem, MenuList } from 'src/components/organisms'

export const Tabs: React.VFC = memo(() => {
  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start">
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
      </Flex>
    </Flex>
  )
})
