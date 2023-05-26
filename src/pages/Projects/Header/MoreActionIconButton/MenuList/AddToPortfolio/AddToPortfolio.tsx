import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { Icon } from 'src/components/ui/atoms'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  projectId: string
}

export const AddToPortfolio: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="plus" color="text.muted" />}
      isDisabled
    >
      Add to Portfolio
    </MenuItem>
  )
})
AddToPortfolio.displayName = 'AddToPortfolio'
