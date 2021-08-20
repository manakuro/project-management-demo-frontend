import React, { memo } from 'react'
import { Button } from 'src/components/atoms'

type Props = {}

export const TodayButton: React.VFC<Props> = memo<Props>(() => {
  return (
    <Button variant="ghost" size="xs">
      Today
    </Button>
  )
})
TodayButton.displayName = 'TodayButton'
