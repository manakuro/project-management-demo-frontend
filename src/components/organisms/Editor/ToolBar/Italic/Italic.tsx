import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { useItalic } from 'src/shared/prosemirror/hooks'
import { TooltipProps } from 'src/components/molecules'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const Italic: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useItalic()

  return (
    <BaseButton
      aria-label="italic"
      icon={<Icon icon="italic" color="text.muted" />}
      {...props}
      action={action}
      tooltip={{
        label: 'Italic\n(⌘+i)',
        'aria-label': 'Italic',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
