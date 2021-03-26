import React, { memo } from 'react'
import { Flex, Heading, Icon, IconButton } from 'src/components/atoms'

export const Tabs: React.VFC = memo(() => {
  return (
    <Flex ml={4} mt={3} flex={1}>
      <Flex alignItems="flex-start">
        <Flex alignItems="center">
          <Heading as="h2" size="md" fontWeight="semibold">
            My Tasks
          </Heading>
          <IconButton
            ml={1}
            aria-label="expand button"
            icon={<Icon icon="chevronDown" />}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Flex>
  )
})
