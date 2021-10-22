import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'

type Props = {
  projectId: string
  teammateId: string
  onOpenPopover: () => void
}

export const AddRole: React.FC<Props> = memo<Props>((props) => {
  const { onOpenPopover } = props

  const handleClick = useCallback(() => {
    onOpenPopover()
  }, [onOpenPopover])

  return <MenuItem onClick={handleClick}>Add role</MenuItem>
})
AddRole.displayName = 'AddRole'
