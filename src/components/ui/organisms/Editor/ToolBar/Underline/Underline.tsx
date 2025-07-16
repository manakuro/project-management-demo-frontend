import type React from 'react'
import { memo } from 'react'
import { Icon, type IconButtonProps } from 'src/components/ui/atoms'
import type { TooltipProps } from 'src/components/ui/molecules'
import { useUnderline } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

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
Underline.displayName = 'Underline'
