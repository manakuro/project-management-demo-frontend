import React, { memo } from 'react'
import { Button, Flex, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

export const ShareButton: React.VFC = memo(() => {
  return (
    <Flex alignItems="center">
      <Tooltip
        hasArrow
        label="Share this space with teammates to let them organize your work."
        aria-label="A share button description"
        size="md"
      >
        <Button
          leftIcon={<Icon icon="lockAlt" mt="-1px" size="xs" />}
          variant="outline"
          size="xs"
        >
          Share
        </Button>
      </Tooltip>
    </Flex>
  )
})
