import React, { useCallback } from 'react'
import { MenuItem } from './MenuItem'

type Props = {
  projectId: string
  onClose: () => void
  onMouseEnter: () => void
}

export const DeleteProject: React.FC<Props> = (props) => {
  const { onClose, onMouseEnter } = props

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onClose()
    },
    [onClose],
  )

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick} isDisabled>
      Delete Project
    </MenuItem>
  )
}
