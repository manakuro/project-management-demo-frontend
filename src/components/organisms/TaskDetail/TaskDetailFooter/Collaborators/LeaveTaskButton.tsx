import React, { memo } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

export const LeaveTaskButton: React.VFC = memo(() => {
  return (
    <Flex alignItems="center">
      <Tooltip
        hasArrow
        label="Stop getting notifications about activity on this task."
        aria-label="A leave task button description"
        size="md"
      >
        <Button
          leftIcon={<Icon icon="bell" mt="-1px" size="xs" />}
          variant="ghost"
          size="xs"
          fontWeight="medium"
          color="text.muted"
        >
          Leave task
        </Button>
      </Tooltip>
    </Flex>
  )
})
