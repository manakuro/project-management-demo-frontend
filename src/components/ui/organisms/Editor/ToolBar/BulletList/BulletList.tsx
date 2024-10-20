import React, { memo } from 'react'
import { Icon, IconButtonProps } from 'src/components/ui/atoms'
import { TooltipProps } from 'src/components/ui/molecules'
import { useBulletList } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

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
BulletList.displayName = 'BulletList'
