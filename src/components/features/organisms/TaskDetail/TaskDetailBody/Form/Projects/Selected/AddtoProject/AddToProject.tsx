import { memo } from 'react'
import { Box, Button, Icon } from 'src/components/ui/atoms'

export const AddToProject = memo(function AddToProject() {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="text.muted" />
    </Button>
  )
})
