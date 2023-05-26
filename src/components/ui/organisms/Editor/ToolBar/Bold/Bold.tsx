import React, { memo } from 'react'
import { Icon, IconButtonProps } from 'src/components/ui/atoms'
import { TooltipProps } from 'src/components/ui/molecules'
import { useBold } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const Bold: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useBold()

  return (
    <BaseButton
      aria-label="bold"
      icon={<Icon icon="bold" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Bold\n(⌘+b)',
        'aria-label': 'Bold',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
Bold.displayName = 'Bold'
