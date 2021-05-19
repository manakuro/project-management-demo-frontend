import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { useUnderline } from 'src/shared/prosemirror/hooks'
import { TooltipProps } from 'src/components/molecules'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const Underline: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useUnderline()
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="underline" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
