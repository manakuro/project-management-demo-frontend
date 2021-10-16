import React, { memo } from 'react'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { TooltipProps } from 'src/components/molecules'
import { useDecreaseListIndent } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = Omit<IconButtonProps, 'aria-label' | 'isActive'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const DecreaseListIndent: React.FC<Props> = memo<Props>((props) => {
  const { action, isEnable } = useDecreaseListIndent()

  return (
    <BaseButton
      aria-label="Decrease list indent"
      icon={<Icon icon="leftIndent" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Decrease list indent\n(⌘+])',
        'aria-label': 'Decrease list indent',
        ...props.tooltip,
      }}
    />
  )
})
DecreaseListIndent.displayName = 'DecreaseListIndent'
