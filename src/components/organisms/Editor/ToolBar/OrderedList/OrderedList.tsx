import React, { memo } from 'react'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { TooltipProps } from 'src/components/molecules'
import { useOrderedList } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const OrderedList: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive } = useOrderedList()

  return (
    <BaseButton
      aria-label="ordered list"
      icon={<Icon icon="listOl" color="text.muted" />}
      action={action}
      {...props}
      tooltip={{
        label: 'Ordered List\n(⌘+⇧+7)',
        'aria-label': 'Ordered List',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
