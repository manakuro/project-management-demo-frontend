import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  projectId: string
}

export const Archive: React.FC<Props> = memo((props) => {
  const { onMouseEnter } = props

  return <MenuItem onMouseEnter={onMouseEnter}>Archive</MenuItem>
})
Archive.displayName = 'Archive'
