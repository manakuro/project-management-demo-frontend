import React, { memo } from 'react'
import { BaseButton } from '../BaseButton'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { useIncreaseListIndent } from 'src/shared/prosemirror/hooks'
import { TooltipProps } from 'src/components/molecules'

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
