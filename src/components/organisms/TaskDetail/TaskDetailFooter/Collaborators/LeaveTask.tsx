import React, { memo } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useCollaboratorsContext } from './Provider'

export const LeaveTask: React.VFC = memo(() => {
  const { isInputFocused } = useCollaboratorsContext()

  if (isInputFocused) return null

  return (
    <Flex alignItems="center" ml="auto" mt={1}>
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
