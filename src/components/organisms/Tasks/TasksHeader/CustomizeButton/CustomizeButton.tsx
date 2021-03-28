import React, { memo } from 'react'
import { Button, Icon } from 'src/components/atoms'

type Props = {}

export const CustomizeButton: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Button
      variant="ghost"
      aria-label="Sort tasks"
      leftIcon={<Icon icon="customize" />}
      size="xs"
    >
      Customize
    </Button>
  )
})
