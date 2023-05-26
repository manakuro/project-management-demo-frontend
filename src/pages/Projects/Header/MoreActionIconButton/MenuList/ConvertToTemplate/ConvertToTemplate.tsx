import React, { memo } from 'react'
import { Icon } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  projectId: string
}

export const ConvertToTemplate: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="layout" color="text.muted" />}
      isDisabled
    >
      Convert to template
    </MenuItem>
  )
})
ConvertToTemplate.displayName = 'ConvertToTemplate'
