import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { useOrderedList } from 'src/shared/prosemirror/hooks'
import { TooltipProps } from 'src/components/molecules'

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
