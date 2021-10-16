import React, { memo } from 'react'
import { Icon, IconButtonProps } from 'src/components/atoms'
import { TooltipProps } from 'src/components/molecules'
import { useLink } from 'src/shared/prosemirror/hooks'
import { BaseButton } from '../BaseButton'

type Props = Omit<IconButtonProps, 'aria-label'> & {
  tooltip?: Omit<TooltipProps, 'children'>
}

export const Link: React.FC<Props> = memo<Props>((props) => {
  const { action, isActive, isEnable } = useLink()

  return (
    <BaseButton
      aria-label="link"
      icon={<Icon icon="link" color="text.muted" />}
      isEnable={isEnable}
      action={action}
      {...props}
      tooltip={{
        label: 'Link\n(⌘+b)',
        'aria-label': 'Link',
        ...props.tooltip,
      }}
      isActive={isActive}
    />
  )
})
Link.displayName = 'Link'
