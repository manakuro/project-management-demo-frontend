import React, { memo } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
}

export const EditProjectDetails: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="pencil" color="text.muted" />}
    >
      Edit Project details
    </MenuItem>
  )
})
EditProjectDetails.displayName = 'EditProjectDetails'
