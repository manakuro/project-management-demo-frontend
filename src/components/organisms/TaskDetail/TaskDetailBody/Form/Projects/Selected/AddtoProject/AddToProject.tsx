import React, { memo } from 'react'
import { Box, Button, Icon } from 'src/components/ui/atoms'

type Props = {}

export const AddToProject: React.FC<Props> = memo<Props>(() => {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="text.muted" />
    </Button>
  )
})
AddToProject.displayName = 'AddToProject'
