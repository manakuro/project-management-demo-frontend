import React, { memo } from 'react'
import { Icon, IconButtonProps } from 'src/components/ui/atoms'
import { TooltipProps } from 'src/components/ui/molecules'
import { useIncreaseListIndent } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = Omit<IconButtonProps, 'aria-label' | 'isActive'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const IncreaseListIndent: React.FC<Props> = memo<Props>((props) => {
  const { action, isEnable } = useIncreaseListIndent()

  return (
    <BaseButton
      aria-label="Increase list indent"
      icon={<Icon icon="rightIndent" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Increase list indent\n(⌘+[)',
        'aria-label': 'Increase list indent',
        ...props.tooltip,
      }}
    />
  )
})
IncreaseListIndent.displayName = 'IncreaseListIndent'
