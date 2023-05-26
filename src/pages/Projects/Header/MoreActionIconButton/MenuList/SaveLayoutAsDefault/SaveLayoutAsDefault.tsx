import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { Icon } from 'src/components/ui/atoms'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  projectId: string
}

export const SaveLayoutAsDefault: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="save" color="text.muted" />}
      isDisabled
    >
      Save layout as default
    </MenuItem>
  )
})
SaveLayoutAsDefault.displayName = 'SaveLayoutAsDefault'
