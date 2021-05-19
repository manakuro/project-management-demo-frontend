import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { useStrikethrough } from 'src/shared/prosemirror/hooks'
import { TooltipProps } from 'src/components/molecules'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const Strikethrough: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useStrikethrough()
  return (
    <BaseButton
      aria-label="strikethrough"
      icon={<Icon icon="strikethrough" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Strikethrough\n(⌘+⇧+S)',
        'aria-label': 'Strikethrough',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
