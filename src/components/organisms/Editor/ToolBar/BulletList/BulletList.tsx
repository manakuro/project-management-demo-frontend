import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { useBulletList } from 'src/shared/prosemirror/hooks'
import { TooltipProps } from 'src/components/molecules'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const BulletList: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useBulletList()
  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="listUl" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Bullet List\n(⌘+⇧+8)',
        'aria-label': 'Bullet List',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
