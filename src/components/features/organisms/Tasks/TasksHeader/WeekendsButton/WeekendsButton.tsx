import React, { memo } from 'react'
import { Button, Icon } from 'src/components/ui/atoms'

type Props = {}

export const WeekendsButton: React.FC<Props> = memo<Props>(() => {
  return (
    <Button
      variant="ghost"
      leftIcon={<Icon icon="calendarAlt" color="text.muted" />}
      size="xs"
    >
      Weekends: On
    </Button>
  )
})
WeekendsButton.displayName = 'WeekendsButton'
