import React, { memo } from 'react'
import { Button, ButtonProps, Icon } from 'src/components/ui/atoms'

type Props = ButtonProps

export const AddSubtaskButton: React.FC<Props> = memo<Props>((props) => {
  return (
    <Button
      mt={2}
      ml="-10px"
      aria-label="Add subtask"
      leftIcon={<Icon icon="plus" />}
      variant="ghost"
      size="xs"
      fontWeight="medium"
      color="text.muted"
      {...props}
    >
      Add subtask
    </Button>
  )
})
AddSubtaskButton.displayName = 'AddSubtaskButton'
